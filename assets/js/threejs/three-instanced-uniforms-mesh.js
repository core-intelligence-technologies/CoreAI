import { InstancedMesh, MeshBasicMaterial, InstancedBufferAttribute } from './three.module.js';
import { createDerivedMaterial, getShaderUniformTypes, voidMainRegExp, getShadersForMaterial } from './troika-three-utils.js';

const precededByUniformRE = /\buniform\s+(int|float|vec[234])\s+$/;
const attrRefReplacer = (name, index, str) => (precededByUniformRE.test(str.substr(0, index)) ? name : `troika_attr_${name}`);
const varyingRefReplacer = (name, index, str) => (precededByUniformRE.test(str.substr(0, index)) ? name : `troika_vary_${name}`);

function createInstancedUniformsDerivedMaterial (baseMaterial, uniformNames) {
  const derived = createDerivedMaterial(baseMaterial, {
    defines: {
      TROIKA_INSTANCED_UNIFORMS: uniformNames.sort().join('|')
    },

    customRewriter ({ vertexShader, fragmentShader }) {
      let vertexDeclarations = [];
      let vertexAssignments = [];
      let fragmentDeclarations = [];

      // Find what uniforms are declared in which shader and their types
      let vertexUniforms = getShaderUniformTypes(vertexShader);
      let fragmentUniforms = getShaderUniformTypes(fragmentShader);

      // Add attributes and varyings for, and rewrite references to, the instanced uniforms
      uniformNames.forEach((name) => {
        let vertType = vertexUniforms[name];
        let fragType = fragmentUniforms[name];
        if (vertType || fragType) {
          let finder = new RegExp(`\\b${name}\\b`, 'g');
          vertexDeclarations.push(`attribute ${vertType || fragType} troika_attr_${name};`);
          if (vertType) {
            vertexShader = vertexShader.replace(finder, attrRefReplacer);
          }
          if (fragType) {
            fragmentShader = fragmentShader.replace(finder, varyingRefReplacer);
            let varyingDecl = `varying ${fragType} troika_vary_${name};`;
            vertexDeclarations.push(varyingDecl);
            fragmentDeclarations.push(varyingDecl);
            vertexAssignments.push(`troika_vary_${name} = troika_attr_${name};`);
          }
        }
      });

      // Inject vertex shader declarations and assignments
      vertexShader = `${vertexDeclarations.join('\n')}\n${vertexShader.replace(voidMainRegExp, `\n$&\n${vertexAssignments.join('\n')}`)}`;

      // Inject fragment shader declarations
      if (fragmentDeclarations.length) {
        fragmentShader = `${fragmentDeclarations.join('\n')}\n${fragmentShader}`;
      }

      return { vertexShader, fragmentShader }
    }
  });

  derived.isInstancedUniformsMaterial = true;
  return derived
}

class InstancedUniformsMesh extends InstancedMesh {
  constructor (geometry, material, count) {
    super(geometry, material, count);
    this._instancedUniformNames = []; //treated as immutable
  }

  /*
   * Getter/setter for automatically wrapping the user-supplied geometry with one that will
   * carry our extra InstancedBufferAttribute(s)
   */
  get geometry () {
    return this._derivedGeometry
  }

  set geometry (geometry) {
    // Extend the geometry so we can add our instancing attributes but inherit everything else
    if (geometry) {
      geometry = Object.create(geometry);
      geometry.attributes = Object.create(geometry.attributes);
    }
    this._derivedGeometry = geometry;
  }

  /*
   * Getter/setter for automatically wrapping the user-supplied material with our upgrades. We do the
   * wrapping lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
   */
  get material () {
    let derivedMaterial = this._derivedMaterial;
    const baseMaterial = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = new MeshBasicMaterial());
    const uniformNames = this._instancedUniformNames;
    if (!derivedMaterial || derivedMaterial.baseMaterial !== baseMaterial || derivedMaterial._instancedUniformNames !== uniformNames) {
      derivedMaterial = this._derivedMaterial = createInstancedUniformsDerivedMaterial(baseMaterial, uniformNames);
      derivedMaterial._instancedUniformNames = uniformNames;
      // dispose the derived material when its base material is disposed:
      baseMaterial.addEventListener('dispose', function onDispose () {
        baseMaterial.removeEventListener('dispose', onDispose);
        derivedMaterial.dispose();
      });
    }
    return derivedMaterial
  }

  set material (baseMaterial) {
    if (Array.isArray(baseMaterial)) {
      throw new Error('InstancedUniformsMesh does not support multiple materials')
    }
    // Unwrap already-derived materials
    while (baseMaterial && baseMaterial.isInstancedUniformsMaterial) {
      baseMaterial = baseMaterial.baseMaterial;
    }
    this._baseMaterial = baseMaterial;
  }

  get customDepthMaterial () {
    return this.material.getDepthMaterial()
  }

  get customDistanceMaterial () {
    return this.material.getDistanceMaterial()
  }

  /**
   * Set the value of a shader uniform for a single instance.
   * @param {string} name - the name of the shader uniform
   * @param {number} index - the index of the instance to set the value for
   * @param {number|Vector2|Vector3|Vector4|Color|Array} value - the uniform value for this instance
   */
  setUniformAt (name, index, value) {
    const attrs = this.geometry.attributes;
    const attrName = `troika_attr_${name}`;
    let attr = attrs[attrName];
    if (!attr) {
      const defaultValue = getDefaultUniformValue(this._baseMaterial, name);
      const itemSize = getItemSizeForValue(defaultValue);
      attr = attrs[attrName] = new InstancedBufferAttribute(new Float32Array(itemSize * this.count), itemSize);
      // Fill with default value:
      if (defaultValue !== null) {
        for (let i = 0; i < this.count; i++) {
          setAttributeValue(attr, i, defaultValue);
        }
      }
      this._instancedUniformNames = [...this._instancedUniformNames, name];
    }
    setAttributeValue(attr, index, value);
    attr.needsUpdate = true;
  }
}

function setAttributeValue (attr, index, value) {
  let size = attr.itemSize;
  if (size === 1) {
    attr.setX(index, value);
  } else if (size === 2) {
    attr.setXY(index, value.x, value.y);
  } else if (size === 3) {
    if (value.isColor) {
      attr.setXYZ(index, value.r, value.g, value.b);
    } else {
      attr.setXYZ(index, value.x, value.y, value.z);
    }
  } else if (size === 4) {
    attr.setXYZW(index, value.x, value.y, value.z, value.w);
  }
}

function getDefaultUniformValue (material, name) {
  // Try uniforms on the material itself, then try the builtin material shaders
  let uniforms = material.uniforms;
  if (uniforms && uniforms[name]) {
    return uniforms[name].value
  }
  uniforms = getShadersForMaterial(material).uniforms;
  if (uniforms && uniforms[name]) {
    return uniforms[name].value
  }
  return null
}

function getItemSizeForValue (value) {
  return value == null ? 0
    : typeof value === 'number' ? 1
    : value.isVector2 ? 2
    : value.isVector3 || value.isColor ? 3
    : value.isVector4 ? 4
    : Array.isArray(value) ? value.length
    : 0
}

export { InstancedUniformsMesh, createInstancedUniformsDerivedMaterial };
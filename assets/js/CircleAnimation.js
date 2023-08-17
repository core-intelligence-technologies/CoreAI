import { Color, DirectionalLight, Matrix4, Vector3 } from "./threejs/three.module.js";
import { BezierMesh } from "./threejs/troika-three-utils.js";
import { InstancedUniformsMesh } from "./threejs/three-instanced-uniforms-mesh.js";

/*
This example demonstrates InstancedUniformsMesh controlling many instances of
BezierMesh (https://github.com/protectwise/troika/tree/master/packages/troika-three-utils#beziermesh)
where each bezier's control point uniforms are set independently.
*/

const count = 100;
const vec3 = new Vector3();
const mat4 = new Matrix4();
const color = new Color();
const twoPi = Math.PI * 2;

function vec3ForAngle(angle, radius) {
  return vec3.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
}
const BasicThreeDemo = window.BasicThreeDemo
// console.log('three check', Color, BezierMesh)
// console.log('BasicThreeDemo', BasicThreeDemo)
// console.log('tium', InstancedUniformsMesh)

class CircleAnimation extends BasicThreeDemo {
  init() {
    // Create a BezierMesh from which we can grab the geometry and material
    const bezierTemplate = new BezierMesh();
    bezierTemplate.material.uniforms.radius.value = 0.1;
    
    // bezierTemplate.material.roughness = 0.3
    // bezierTemplate.material.metalness = 0.8

    // Create the InstancedUniformsMesh from that BezierMesh template
    const mesh = new InstancedUniformsMesh(
      bezierTemplate.geometry,
      bezierTemplate.material,
      count
    );

    // Set static instance properties
    for (let i = 0; i < count; i++) {
      mesh.setMatrixAt(i, mat4.identity()); //must fill matrix array
      const angle = (i / count) * (Math.PI * 2);

      // Outer points will be stationary
      mesh.setUniformAt("pointB", i, vec3ForAngle(angle, 20));

      // Rainbow colors
      mesh.setUniformAt(
        "diffuse",
        i,
        color
          .setRGB(Math.sin(angle + 3), Math.sin(angle + 1), Math.sin(angle * 2))
          .addScalar(0.8)
      );
    }

    const light = new DirectionalLight();
    light.position.set(0, 1, 1);

    this.scene.add(mesh);
    this.scene.add(light);
    this.mesh = mesh;
    this.tick();
  }
  update() {
    // Adjust the inner point and control point uniforms in wave patterns
    const waveSpeed = 0.5
    const angleShift = (((Date.now() * waveSpeed) % 3000) / 3000) * twoPi;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * (Math.PI * 2);
      this.mesh.setUniformAt(
        "pointA",
        i,
        vec3ForAngle(angle, 3).setZ(Math.sin(angle + angleShift) * 2)
      );
      this.mesh.setUniformAt(
        "controlA",
        i,
        vec3ForAngle(angle, 6).setZ(Math.cos(angle * 2 + angleShift) * 8)
      );
      this.mesh.setUniformAt(
        "controlB",
        i,
        vec3ForAngle(angle + Math.cos(angleShift) / 3, 17).setZ(
          Math.sin(angle * 3 + angleShift) * 8
        )
      );
      // this.mesh.setUniformAt(
      //   'radius',
      //   i,
      //   (Math.sin((angle + angleShift)) + 1.1) * 0.2
      // )
    }

    // Rotate the whole thing slowly
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.0001;
  }
}

window.CircleAnimation = CircleAnimation
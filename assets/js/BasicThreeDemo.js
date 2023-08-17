import * as THREE from 'three';

class BasicThreeDemo {
  constructor(container) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(container.offsetWidth * 0.7, container.offsetHeight * 0.7, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    container.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.1,
      10000
    );
    this.camera.position.z = 50;
    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();
    this.assets = {};
    this.disposed = false;
    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.setSize = this.setSize.bind(this);
  }
  loadAssets() {
    return Promise.resolve();
  }
  init() {
    this.tick();
  }
  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }
  setSize(width, height, updateStyle) {
    this.renderer.setSize(width, height, false);
  }
  onResize() {}
  onWindowResize() {
    // const canvas = this.renderer.domElement;
    this.camera.aspect = window.innerWidth  / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.setSize(window.innerWidth, window.innerHeight)
  }
  dispose() {
    this.disposed = true;
  }
  update() {}
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  tick() {
    if (this.disposed) return;
    // not working, need investigate more, use jquery on window resize for now
    // if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
    //   const canvas = this.renderer.domElement;
    //   this.camera.aspect = canvas.clientWidth  / canvas.clientHeight;
    //   this.camera.updateProjectionMatrix();
    //   this.onResize();
    // }
    this.render();
    this.update();
    requestAnimationFrame(this.tick);
  }
}

function resizeRendererToDisplaySize(renderer, setSize) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    setSize(width, height, false);
  }
  return needResize;
}

window.BasicThreeDemo = BasicThreeDemo
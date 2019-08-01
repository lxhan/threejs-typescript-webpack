import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.scss';
import { SphereBufferGeometry, MeshBasicMaterial } from 'three';

class MainLoop {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.windowWidth / this.windowHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.pointLight = new THREE.PointLight(0xffffff);
    this.axesHelper = new THREE.AxesHelper(50);
    this.gridHelper = new THREE.GridHelper(90, 9, 0xe8e8e8, 0xe8e8e8);
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.sphereGeometry = new SphereBufferGeometry(2, 32, 32);
    this.sphereMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
  }

  createScene(): void {
    this.camera.position.set(75, 75, 75);
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.setSize(this.windowWidth, this.windowHeight);
    this.sphere.position.set(0, 0, 0);
    this.pointLight.position.set(10, 50, 130);
    this.camera.lookAt(this.scene.position);
    this.orbitControls.update();
    this.scene.add(this.gridHelper, this.axesHelper, this.pointLight, this.sphere);

    document.body.appendChild(this.renderer.domElement);
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private pointLight: THREE.PointLight;
  private axesHelper: THREE.AxesHelper;
  private gridHelper: THREE.GridHelper;
  private orbitControls: OrbitControls;
  private sphere: THREE.Mesh;
  private sphereGeometry: THREE.SphereBufferGeometry;
  private sphereMaterial: THREE.MeshBasicMaterial;
  readonly windowWidth: number = window.innerWidth;
  readonly windowHeight: number = window.innerHeight;
  readonly devicePixelRatio: number = window.devicePixelRatio;
}

window.onload = () => {
  const mainLoop = new MainLoop();
  mainLoop.createScene();
  mainLoop.animate();
};

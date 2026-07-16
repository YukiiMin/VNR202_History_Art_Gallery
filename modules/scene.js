import * as THREE from "three";
import { PointerLockControls } from "three-stdlib";

export const scene = new THREE.Scene(); // create a scene
let camera;
let controls;
let renderer;

export const setupScene = () => {
  // PerspectiveCamera is a type of camera that mimics the way the human eye sees things. It takes 4 parameters: field of view, aspect ratio, near clipping plane, and far clipping plane. The field of view is the extent of the scene that is seen on the display at any given moment. The aspect ratio should be the width of the element divided by the height (in this case, the screen width and height). The camera will not render objects that are closer to the camera than the near clipping plane or further away than the far clipping plane. Objects that are exactly on the clipping plane will not be rendered.
  camera = new THREE.PerspectiveCamera(
    60, // fov = field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
  );
  scene.add(camera); // add the camera to the scene
  camera.position.set(0, 2.2, 17); // Đón đầu tại Cửa vào với chiều cao tầm mắt người bình thường (y = 2.2)

  renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialias for smoother edges
  renderer.setPixelRatio(window.devicePixelRatio); // Render at native screen resolution
  renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer

  // Màu nền tối — fallback khi player nhìn ra ngoài qua cửa sổ/cửa ra.
  // Đây là phòng kín (closed room): 4 tường đặc BoxGeometry 80×20 ở position ±20
  // đã che kín toàn bộ sphere bán kính 50 → sky sphere vô dụng + lãng phí VRAM.
  // Chỉ giữ clearColor để che lấp nếu nhìn qua các khe cửa.
  renderer.setClearColor(0x0a0806, 1); // Đen nâu ấm — hợp tone museum interior

  document.body.appendChild(renderer.domElement); // append the renderer to the body of the document (the <canvas> element that the renderer uses will be added to the body)

  renderer.shadowMap.enabled = false; // DISABLED — GPU texture unit budget (MAX=16) is exhausted by 16 Cloudinary painting textures; shadow maps would require additional units on top.

  controls = new PointerLockControls(camera, renderer.domElement); // create a PointerLockControls object that takes the camera and the renderer's domElement as arguments. PointerLockControls is a class that allows the camera to be controlled by the mouse and keyboard.
  scene.add(controls.getObject()); // add the PointerLockControls object to the scene

  window.addEventListener("resize", onWindowResize, false); // add an event listener to the window that calls the onWindowResize function when the window is resized. Its work is to update the camera's aspect ratio and the renderer's size. The third parameter is set to false to indicate that the event listener should be triggered in the bubbling phase instead of the capturing phase. The bubbling phase is when the event bubbles up from the target element to the parent elements. The capturing phase is when the event trickles down from the parent elements to the target element. The default value is false, so we don't need to include it, but I included it for clarity. The capturing phase is rarely used, so you can ignore it for now. You can read more about the bubbling and capturing phases here: https://javascript.info/bubbling-and-capturing

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // update the camera's aspect ratio
    camera.updateProjectionMatrix(); // update the projection matrix. The projection matrix is used to determine how 3D points are mapped to the 2D space of the screen. It is used to calculate the frustum of the camera which is a truncated pyramid that represents the camera's field of view. Anything outside the frustum is not rendered. The projection matrix is used to calculate the frustum every time the window is resized.
    renderer.setSize(window.innerWidth, window.innerHeight); // update the size of the renderer
  }

  return { camera, controls, renderer }; // return the camera, controls, and renderer so that they can be used in other modules
};
export const setupVR = (renderer) => {
  // WebXR enabled for future VR support — không hiển thị button "VR NOT SUPPORTED"
  // để tránh làm xấu UI khi trình duyệt không hỗ trợ WebXR
  renderer.xr.enabled = true;

  renderer.xr.addEventListener("sessionstart", () => {
    console.log("[VR] WebXR session started");
  });

  renderer.xr.addEventListener("sessionend", () => {
    console.log("[VR] WebXR session ended");
  });

  // Ẩn VRButton — hiển thị "VR NOT SUPPORTED" gây mất thẩm mỹ
  // Nếu muốn bật lại: uncomment dòng dưới
  // import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
  // document.body.appendChild(VRButton.createButton(renderer));
};

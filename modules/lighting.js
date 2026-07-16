import * as THREE from "three";

// ── State variables for dynamic lighting controls ─────────────
let lightsOn = true;
let ambientLightGlobal = null;
let hemisphereLightGlobal = null;
let paintingSpotlightsGlobal = []; // Chỉ lưu spotlight của tranh (luôn bật)
let deskSpotlightGlobal = null;     // Spotlight rọi khu vực bàn (tắt khi tắt đèn phòng)
let pointLightsGlobal = [];        // PointLight giả lập đèn bàn
export let deskLampRef = null;     // Reference to the interactive desk lamp PointLight

export const setupLighting = (scene, paintings) => {
  // Clear any existing references to prevent duplicates on reload
  paintingSpotlightsGlobal = [];
  pointLightsGlobal = [];

  // ── Ambient Light — ấm áp hơn và sáng rõ hơn ───────────────
  // Tăng cường độ từ 0.25 lên 0.6 và chuyển sang tông màu vàng ấm cao cấp
  const ambientLight = new THREE.AmbientLight(0xfff5e0, 0.6);
  scene.add(ambientLight);
  ambientLightGlobal = ambientLight;

  // ── Spotlight cho từng tranh — Khắc phục "bức sáng bức tối" ────
  if (paintings && paintings.length > 0) {
    paintings.forEach((painting, index) => {
      const pos = painting.position;
      let spotX = pos.x;
      let spotY = pos.y + 4.5;
      let spotZ = pos.z;

      // Tính toán vị trí đèn chiếu hướng xéo từ trên xuống trước mặt bức tranh
      if (pos.x < -15) {        // Tường trái: chiếu từ phải sang trái
        spotX = pos.x + 4.5;
      } else if (pos.x > 15) {  // Tường phải: chiếu từ trái sang phải
        spotX = pos.x - 4.5;
      } else if (pos.z < -15) { // Tường trước: chiếu từ sau ra trước
        spotZ = pos.z + 4.5;
      } else if (pos.z > 15) {  // Tường sau: chiếu từ trước ra sau
        spotZ = pos.z - 4.5;
      }

      // Tạo spotlight tập trung cho từng bức tranh
      const spot = new THREE.SpotLight(0xfff5e0, 2.5); // Màu vàng ấm cao cấp, cường độ 2.5
      spot.position.set(spotX, spotY, spotZ);
      spot.target = painting;
      // castShadow DISABLED — shadow maps consume GPU texture units beyond budget
      spot.angle = 0.5;
      spot.penumbra = 0.6;
      spot.decay = 1.2;
      spot.distance = 25;

      scene.add(spot);
      scene.add(spot.target);
      paintingSpotlightsGlobal.push(spot);
    });
  }

  // ── Spotlight cho khu vực giữa phòng (Bàn làm việc của Bác) ───
  const deskSpotlight = new THREE.SpotLight(0xffa040, 1.8);
  deskSpotlight.position.set(0, 7, 0);
  deskSpotlight.target.position.set(0, 0, 0);
  deskSpotlight.angle = 0.55;
  deskSpotlight.penumbra = 0.8;
  deskSpotlight.decay = 1.2;
  deskSpotlight.distance = 15;
  scene.add(deskSpotlight);
  scene.add(deskSpotlight.target);
  deskSpotlightGlobal = deskSpotlight;

  // ── Đèn dầu / Đèn bàn ấm áp tại vị trí bàn làm việc ───────────
  // Bắt đầu ở trạng thái TẮT (intensity = 0) theo yêu cầu thiết kế
  const deskLamp = new THREE.PointLight(0xff8c30, 0, 10, 2);
  deskLamp.position.set(0.0, 2.5, -1.8); // Khớp với vị trí đèn mới ở phía trước (z=-1.8)
  scene.add(deskLamp);
  deskLampRef = deskLamp; // Lưu lại tham chiếu toàn cục để bật/tắt độc lập

  // ── Fill light nhẹ từ dưới sàn để giữ chiều sâu cho phòng ─────
  const fillLight = new THREE.HemisphereLight(0xfff5e0, 0x1a1410, 0.25);
  scene.add(fillLight);
  hemisphereLightGlobal = fillLight;
};

// ── Hàm bật/tắt toàn bộ đèn trong phòng triển lãm ──────────────
export const toggleLights = () => {
  lightsOn = !lightsOn;
  
  const btn = document.getElementById("toggle_light");
  
  if (lightsOn) {
    // BẬT ĐÈN: Khôi phục cường độ ánh sáng ấm áp
    if (ambientLightGlobal) ambientLightGlobal.intensity = 0.6;
    if (hemisphereLightGlobal) hemisphereLightGlobal.intensity = 0.25;
    if (deskSpotlightGlobal) deskSpotlightGlobal.intensity = 1.8;
    
    // Khôi phục spotlight rọi tranh về cường độ bình thường
    paintingSpotlightsGlobal.forEach(spot => {
      spot.intensity = 2.5;
    });
    
    // Đèn bàn hoạt động độc lập, bỏ cập nhật tự động tại đây
    
    if (btn) {
      btn.innerHTML = "💡 Tắt bớt đèn";
      btn.classList.remove("off");
    }
  } else {
    // TẮT ĐÈN PHÒNG: Chỉ giữ lại spotlight rọi tranh tự phát sáng rực rỡ hơn
    if (ambientLightGlobal) ambientLightGlobal.intensity = 0.05;
    if (hemisphereLightGlobal) hemisphereLightGlobal.intensity = 0.03;
    if (deskSpotlightGlobal) deskSpotlightGlobal.intensity = 0; // Tắt đèn rọi bàn
    
    // TĂNG CƯỜNG ĐỘ của các spotlight rọi tranh lên 3.5 để tranh sáng rực rỡ
    paintingSpotlightsGlobal.forEach(spot => {
      spot.intensity = 3.5;
    });
    
    // Đèn bàn hoạt động độc lập, bỏ cập nhật tự động tại đây
    
    if (btn) {
      btn.innerHTML = "💡 Bật đèn phòng";
      btn.classList.add("off");
    }
  }

  console.log(`[Lighting] Lights toggled: ${lightsOn ? "ON" : "OFF"}`);
  return lightsOn;
};


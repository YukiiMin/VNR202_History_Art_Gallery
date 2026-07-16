import * as THREE from "three";

// ── Trần nhà tối — museum aesthetic ──────────────────────────
// Không dùng lá cờ đỏ (gây mất cảm giác triển lãm nghệ thuật)
// Thay bằng trần tối #1A1410 (Đen Mực Tàu) với viền moulding nhẹ
export const createCeiling = (scene, textureLoader) => {

  // Trần chính — màu tối, không phản sáng
  const ceilingGeometry = new THREE.PlaneGeometry(45, 45);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1410,   // Đen mực tàu từ design system
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceilingPlane.rotation.x = Math.PI / 2;
  ceilingPlane.position.y = 10;
  scene.add(ceilingPlane);

  // ── Viền moulding trang trí xung quanh trần (cornice chính) ───
  const corniceGeometry = new THREE.BoxGeometry(42, 0.3, 0.3);
  const corniceMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a6f3c,  // Vàng cổ vật tối sang trọng
    roughness: 0.75,
    metalness: 0.2,
  });

  const cornicePositions = [
    { pos: [0, 9.85, -20], ry: 0 },           // Front
    { pos: [0, 9.85,  20], ry: 0 },           // Back
    { pos: [-20, 9.85, 0], ry: Math.PI / 2 }, // Left
    { pos: [ 20, 9.85, 0], ry: Math.PI / 2 }, // Right
  ];

  cornicePositions.forEach(({ pos, ry }) => {
    const c = new THREE.Mesh(corniceGeometry, corniceMaterial);
    c.position.set(...pos);
    c.rotation.y = ry;
    scene.add(c);
  });

  // ── Viền moulding trần tầng 2 mỏng hơn (Cornice Profile 2) ───
  const corniceGeometry2 = new THREE.BoxGeometry(42, 0.12, 0.12);
  const cornicePositions2 = [
    { pos: [0, 9.65, -19.94], ry: 0 },           // Front
    { pos: [0, 9.65,  19.94], ry: 0 },           // Back
    { pos: [-19.94, 9.65, 0], ry: Math.PI / 2 }, // Left
    { pos: [ 19.94, 9.65, 0], ry: Math.PI / 2 }, // Right
  ];

  cornicePositions2.forEach(({ pos, ry }) => {
    const c2 = new THREE.Mesh(corniceGeometry2, corniceMaterial);
    c2.position.set(...pos);
    c2.rotation.y = ry;
    scene.add(c2);
  });

  // ── Phào chân tường chạy sát mép sàn (Baseboard Moulding) ───
  const baseboardGeometry = new THREE.BoxGeometry(41.8, 0.28, 0.08); // Cao 28cm, dày 8cm
  const baseboardPositions = [
    { pos: [0, -3.0, -19.9], ry: 0 },           // Front
    { pos: [0, -3.0,  19.9], ry: 0 },           // Back
    { pos: [-19.9, -3.0, 0], ry: Math.PI / 2 }, // Left
    { pos: [ 19.9, -3.0, 0], ry: Math.PI / 2 }, // Right
  ];

  baseboardPositions.forEach(({ pos, ry }) => {
    const b = new THREE.Mesh(baseboardGeometry, corniceMaterial);
    b.position.set(...pos);
    b.rotation.y = ry;
    scene.add(b);
  });

  // ── Track Lights Trên Trần (Thanh ray 3D + Đầu đèn rọi) ──────
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a, // Đen mờ sắt cao cấp
    metalness: 0.8,
    roughness: 0.2
  });

  const railGeo = new THREE.BoxGeometry(32, 0.08, 0.15); // Ray đèn mảnh
  const spotGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 16); // Đầu đèn trụ tròn nhỏ

  // Thanh ray đèn chéo cách tường 4.5m giống như trong lighting.js
  const railPositions = [
    { pos: [0, 9.6, -15.5], ry: 0, spots: [-8, 0, 8], type: 'front' },     // Tường Trước
    { pos: [0, 9.6, 15.5], ry: 0, spots: [-8, 0, 8], type: 'back' },       // Tường Sau
    { pos: [-15.5, 9.6, 0], ry: Math.PI / 2, spots: [-8, 8], type: 'left' }, // Tường Trái
    { pos: [15.5, 9.6, 0], ry: Math.PI / 2, spots: [-8, 8], type: 'right' }  // Tường Phải
  ];

  railPositions.forEach(({ pos, ry, spots, type }) => {
    // 1. Tạo thanh ray
    const rail = new THREE.Mesh(railGeo, trackMat);
    rail.position.set(...pos);
    rail.rotation.y = ry;
    scene.add(rail);

    // 2. Tạo đầu đèn cylinder hướng chéo chĩa vào tranh (được nâng cấp thêm bóng LED phát sáng rực rỡ)
    const bulbGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff0d0 }); // Ánh sáng LED vàng ấm tự phát sáng rực rỡ
    
    spots.forEach(offset => {
      const spotGroup = new THREE.Group();
      
      // Thân đèn sắt đen mờ
      const spotMesh = new THREE.Mesh(spotGeo, trackMat);
      spotMesh.position.set(0, 0, 0);
      spotGroup.add(spotMesh);
      
      // Bóng đèn sáng ở đáy trụ tròn
      const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
      bulbMesh.position.set(0, -0.2, 0); // Đặt ở mặt đáy của đầu đèn
      spotGroup.add(bulbMesh);

      // Định vị toàn bộ cụm đèn rọi
      if (type === 'front') {
        spotGroup.position.set(offset, 9.4, -15.5);
        spotGroup.rotation.x = Math.PI / 6; // Chĩa vào tường trước
      } else if (type === 'back') {
        spotGroup.position.set(offset, 9.4, 15.5);
        spotGroup.rotation.x = -Math.PI / 6; // Chĩa vào tường sau
      } else if (type === 'left') {
        spotGroup.position.set(-15.5, 9.4, offset);
        spotGroup.rotation.z = -Math.PI / 6; // Chĩa vào tường trái
      } else if (type === 'right') {
        spotGroup.position.set(15.5, 9.4, offset);
        spotGroup.rotation.z = Math.PI / 6; // Chĩa vào tường phải
      }

      scene.add(spotGroup);
    });
  });
};


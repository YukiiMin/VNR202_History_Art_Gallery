import * as THREE from "three";

export function createWalls(scene) {
  let wallGroup = new THREE.Group();
  scene.add(wallGroup);

  // Material cho tường chính (Front + Back) treo tranh - Đỏ đất bảo tàng
  // NOTE: normal/roughness maps removed to stay under MAX_TEXTURE_IMAGE_UNITS=16
  // (16 Cloudinary paintings + 1 floor = 17 slots used; adding maps would exceed limit)
  const mainWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x7B2D1E,
    normalScale: new THREE.Vector2(0.3, 0.3),
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  // Material cho tường hông (Left + Right) không treo tranh - Đen nâu tạo chiều sâu
  const sideWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E1A14,
    normalScale: new THREE.Vector2(0.2, 0.2),
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  // Front Wall (treo tranh)
  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001),
    mainWallMaterial
  );
  frontWall.position.z = -20;

  // Left Wall (không treo tranh)
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001),
    sideWallMaterial
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -20;

  // Right Wall (không treo tranh)
  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001),
    sideWallMaterial
  );
  rightWall.position.x = 20;
  rightWall.rotation.y = Math.PI / 2;

  // Back Wall (treo tranh)
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(80, 20, 0.001),
    mainWallMaterial
  );
  backWall.position.z = 20;

  wallGroup.add(frontWall, backWall, leftWall, rightWall);

  return wallGroup;
}

// ── Tạo khung tranh 3D (museum picture frame) ────────────────
// Gọi sau khi paintings đã được tạo, nhận mảng paintingData và add vào scene
export function createPaintingFrames(scene, paintingDataArr) {
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x6b4e2a,   // Nâu gỗ tối — khung tranh bảo tàng
    roughness: 0.7,
    metalness: 0.15,
  });

  const frameAccentMat = new THREE.MeshStandardMaterial({
    color: 0xc9a84c,   // Vàng cổ vật — viền trong cùng mỏng
    roughness: 0.5,
    metalness: 0.3,
  });

  paintingDataArr.forEach((data) => {
    const w = data.width;
    const h = data.height;
    const depth = 0.08;
    const frameThickness = 0.25;
    const accentWidth = 0.05;

    // 4 thanh khung gỗ nâu (top, bottom, left, right)
    const frameSegments = [
      { size: [w + frameThickness * 2, frameThickness, depth], offset: [0, h / 2 + frameThickness / 2, 0.01] },
      { size: [w + frameThickness * 2, frameThickness, depth], offset: [0, -(h / 2 + frameThickness / 2), 0.01] },
      { size: [frameThickness, h, depth], offset: [-(w / 2 + frameThickness / 2), 0, 0.01] },
      { size: [frameThickness, h, depth], offset: [w / 2 + frameThickness / 2, 0, 0.01] },
    ];

    // Viền vàng accent bên trong
    const accentSegments = [
      { size: [w + accentWidth * 2, accentWidth, depth], offset: [0, h / 2 + accentWidth / 2, 0.009] },
      { size: [w + accentWidth * 2, accentWidth, depth], offset: [0, -(h / 2 + accentWidth / 2), 0.009] },
      { size: [accentWidth, h, depth], offset: [-(w / 2 + accentWidth / 2), 0, 0.009] },
      { size: [accentWidth, h, depth], offset: [w / 2 + accentWidth / 2, 0, 0.009] },
    ];

    const frameGroup = new THREE.Group();
    frameGroup.position.set(data.position.x, data.position.y, data.position.z);
    frameGroup.rotation.y = data.rotationY;

    frameSegments.forEach(({ size, offset }) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(...size),
        frameMaterial
      );
      mesh.position.set(...offset);
      frameGroup.add(mesh);
    });

    accentSegments.forEach(({ size, offset }) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(...size),
        frameAccentMat
      );
      mesh.position.set(...offset);
      frameGroup.add(mesh);
    });

    scene.add(frameGroup);
  });
}

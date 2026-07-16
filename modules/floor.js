import * as THREE from "three";

export const setupFloor = (scene) => {
  // NOTE: CanvasTexture removed — floor is solid color to stay under
  // MAX_TEXTURE_IMAGE_UNITS = 16.
  // (16 Cloudinary paintings already use all 16 slots.)
  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x4A3118, // Dark warm brown matching the encaustic tile base
    roughness: 0.35,
    metalness: 0.15,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI; // -3.14

  scene.add(floorPlane);
};

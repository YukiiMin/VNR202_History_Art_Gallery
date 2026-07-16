import * as THREE from "three";

/**
 * Builds a procedural Bác Hồ bust placeholder.
 * Previously this file loaded /models/statue_bac_ho.glb, but that GLB's material
 * shader uniform cache was triggering `Uncaught TypeError: Cannot read properties
 * of undefined (reading 'value')` in THREE r151's refreshUniformsCommon on every
 * render frame. We replace it with a lightweight procedural mesh that uses a
 * plain MeshStandardMaterial — guaranteed clean uniform set.
 */
export const loadStatueModel = (scene, interactiveObjects = []) => {
  const FLOOR_Y = -Math.PI; // -3.14

  const statueGroup = new THREE.Group();
  statueGroup.name = 'statue_bac_ho';

  // Bust body — a tapered cylinder representing torso + head
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0xb8a890,    // beige limestone
    roughness: 0.85,
    metalness: 0.05,
  });
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x4a3a2c,    // dark wood pedestal
    roughness: 0.7,
    metalness: 0.1,
  });

  // Pedestal
  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.2, 1.2),
    pedestalMat,
  );
  pedestal.position.y = 0.6;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  statueGroup.add(pedestal);

  // Torso (lower bust)
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 1.0, 24),
    stoneMat,
  );
  torso.position.y = 1.7;
  torso.castShadow = true;
  torso.receiveShadow = true;
  statueGroup.add(torso);

  // Shoulders/upper torso (slightly wider)
  const shoulders = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.55, 0.4, 24),
    stoneMat,
  );
  shoulders.position.y = 2.35;
  shoulders.castShadow = true;
  statueGroup.add(shoulders);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 24),
    stoneMat,
  );
  head.position.y = 2.95;
  head.castShadow = true;
  head.receiveShadow = true;
  statueGroup.add(head);

  // Plaque on pedestal front
  const plaqueMat = new THREE.MeshStandardMaterial({
    color: 0xc9a84c,    // gold plaque
    roughness: 0.4,
    metalness: 0.6,
  });
  const plaque = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.3, 0.05),
    plaqueMat,
  );
  plaque.position.set(0, 0.7, 0.62);
  statueGroup.add(plaque);

  statueGroup.position.set(0, FLOOR_Y, -5);

  // Non-interactive: walking into a hero statue shouldn't trigger info modals.
  scene.add(statueGroup);

  // Note: we intentionally do not push to interactiveObjects because the
  // /models/statue_bac_ho.glb version was also non-interactive.
};

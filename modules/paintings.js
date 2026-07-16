import * as THREE from 'three';

import { paintingData } from './paintingData.js';

export function createPaintings(scene, textureLoader) {

  let paintings = [];

  paintingData.forEach((data) => {

    const texture = textureLoader.load(
      data.imgSrc,
      undefined,
      undefined,
      (err) => {
        console.warn('[paintings] Failed to load image:', data.imgSrc, err);
      }
    );
    texture.colorSpace = THREE.SRGBColorSpace;

    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(data.width, data.height),
      // MeshBasicMaterial — simplest shader, immune to PBR uniform-cache
      // crashes some GLBs trigger on the first render frame. DoubleSide so
      // raycasting hits the plane regardless of which wall rotation we used.
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    );

    painting.position.set(data.position.x, data.position.y, data.position.z);
    painting.rotation.y = data.rotationY;

    painting.userData = {
      type: 'painting',
      info: data.info,
    };

    paintings.push(painting);
  });

  return paintings;
}

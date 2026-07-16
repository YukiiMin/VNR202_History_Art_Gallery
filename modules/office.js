import * as THREE from 'three';

export let deskBox = new THREE.Box3();

const FLOOR_Y = -Math.PI;

function createProceduralDesk(scene, interactiveObjects) {
    const deskGroup = new THREE.Group();
    deskGroup.name = 'desk';

    const woodMat = new THREE.MeshStandardMaterial({
        color: 0x6b3a1f,
        roughness: 0.85,
        metalness: 0.05,
    });

    const top = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 2.2), woodMat);
    top.position.y = 1.4;
    deskGroup.add(top);

    const legGeo = new THREE.BoxGeometry(0.25, 1.4, 0.25);
    const legPositions = [
        [-1.7, 0.7, 0.9],
        [1.7, 0.7, 0.9],
        [-1.7, 0.7, -0.9],
        [1.7, 0.7, -0.9],
    ];

    legPositions.forEach((pos) => {
        const leg = new THREE.Mesh(legGeo, woodMat);
        leg.position.set(...pos);
        deskGroup.add(leg);
    });

    deskGroup.position.set(0, FLOOR_Y, 0);
    deskGroup.rotation.y = Math.PI;

    scene.add(deskGroup);

    deskGroup.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(deskGroup);
    box.expandByScalar(0.5);
    deskBox.copy(box);
}

function createProceduralRadio(scene, interactiveObjects) {
    const group = new THREE.Group();
    group.name = 'vintage_radio';

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x6b2f1a, roughness: 0.75, metalness: 0.05 });
    const speakerMat = new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.9, metalness: 0.1 });
    const dialMat = new THREE.MeshStandardMaterial({ color: 0xc4a882, roughness: 0.3, metalness: 0.75 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.7), bodyMat);
    body.position.y = 0.35;
    group.add(body);

    const speaker = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.05), speakerMat);
    speaker.position.set(0, 0.45, 0.36);
    group.add(speaker);

    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 20), dialMat);
    dial.rotation.x = Math.PI / 2;
    dial.position.set(0.3, 0.35, 0.36);
    group.add(dial);

    group.userData.interactive = true;
    interactiveObjects.push(group);
    scene.add(group);

    return group;
}

export const loadOfficeModels = (scene, interactiveObjects) => {
    // Procedural desk (no GLB — avoids unwanted cabinet meshes)
    createProceduralDesk(scene, interactiveObjects);

    // Procedural radio placed ON the desk surface
    const radio = createProceduralRadio(scene, interactiveObjects);
    // Desk top surface is at y = FLOOR_Y + 1.4 = -3.14 + 1.4 = -1.74
    // Radio sits on desk surface
    radio.position.set(0.3, FLOOR_Y + 1.5, 0);
};

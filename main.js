import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls, createPaintingFrames } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton, setupAboutButton, bindMenuControls } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { setupVR } from "./modules/VRSupport.js";
import { setupGates } from "./modules/gates.js";
import { setupInteraction, interactiveObjects } from "./modules/interaction.js";
import { bindControls } from "./modules/ui.js";
import { paintingData } from "./modules/paintingData.js";
import { loadOfficeModels } from "./modules/office.js";

// 1. Scene + camera + controls + renderer
let { camera, controls, renderer } = setupScene();

// 1b. Bind controls into ui.js so showModal/hideModal can lock/unlock pointer.
bindControls(controls);
bindMenuControls(controls);

// 2. Audio + VR
setupAudio(camera);
setupVR(renderer);

// 3. World construction
const textureLoader = new THREE.TextureLoader();
const walls = createWalls(scene);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);
const lighting = setupLighting(scene, paintings);

// 4. Decoration: frames + entrance/exit gates
createPaintingFrames(scene, paintingData);
setupGates(scene);

// 5. Bounding boxes + scene add
createBoundingBoxes(walls);
createBoundingBoxes(paintings);
addObjectsToScene(scene, paintings);

// 6. Menu + event listeners + VR
setupPlayButton(controls);
setupAboutButton();
setupEventListeners(controls, camera, scene);

// 7. Interactive props: desk (from office.js).
// Statue is removed (GLB shader crash on GPU with <16 texture units).
// Typewriter, radio, lamp, window removed — only desk needed for MVP.
// Paintings are pushed inside setupInteraction from the dedicated `paintings` array,
// so we no longer double-push them here.
console.log("Loading office models (desk only)...");
loadOfficeModels(scene, interactiveObjects);

// 8. Interaction setup (raycaster, hover, click, modal).
setupInteraction(camera, interactiveObjects, paintings);

// 9. Render loop
window.interactiveCamera = camera;
setupRendering(scene, camera, renderer, paintings, controls, walls);
console.info('[app] render loop started; pointer-lock via', renderer.domElement);

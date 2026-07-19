import * as THREE from 'three';
import {
    showHoverInfo,
    hideHoverInfo,
    openPaintingModal,
    openHistoricalModal,
    hideModal,
} from './ui.js';
import { triggerEndingModal } from './gates.js';

let raycaster;
const mouse = new THREE.Vector2(0, 0);
export const interactiveObjects = [];
let hoveredObject = null;
let paintingsRef = [];

export const isHovering = () => hoveredObject !== null;

const HOVER_SCALE = 1.05;

// Radio prop audio state
let radioAudio = null;
let isRadioPlaying = false;

// Exit hold timer
let exitHoldTimer = null;
const EXIT_HOLD_DURATION = 1500;

export function setupInteraction(camera, objects, paintings) {
    interactiveObjects.push(...objects);
    if (paintings && paintings.length) {
        interactiveObjects.push(...paintings);
    }
    paintingsRef = paintings || [];
    raycaster = new THREE.Raycaster();

    initInteractionAudio();

    // Click handler: paintings open modal, exit_gate triggers ending, radio toggles audio
    document.addEventListener('click', (e) => {
        if (!document.pointerLockElement) return;
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        const intersects = raycaster.intersectObjects(interactiveObjects, true);
        const hit = intersects.find(i => i.distance < 20);
        // DEBUG: log first few clicks to help diagnose "click does nothing"
        if (!window.__clickLogged) {
            window.__clickLogged = true;
            console.log('[click-debug] interactiveObjects count:', interactiveObjects.length,
                '| intersects:', intersects.length,
                '| first 3 names:', intersects.slice(0, 3).map(i => i.object.name || i.object.userData?.type || 'unknown'),
                '| pointerLockElement:', !!document.pointerLockElement);
        }
        if (!hit) return;
        const target = getInteractiveRoot(hit.object);
        triggerInteraction(target);
    });

    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => hideModal());
    }

    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.addEventListener('click', function closeOnBackdrop(e) {
            if (e.target === modal) {
                hideModal();
                modal.removeEventListener('click', closeOnBackdrop);
            }
        });
        modal.addEventListener('contextmenu', (e) => {
            if (modal.style.display === 'flex') {
                e.preventDefault();
                hideModal();
            }
        }, false);
    }

    window.addEventListener('contextmenu', (e) => {
        if (modal && modal.style.display === 'flex') {
            e.preventDefault();
            hideModal();
        }
    }, false);
}

function initInteractionAudio() {
    if (!radioAudio) {
        radioAudio = new Audio('/sounds/Tuyen_ngon_doc_lap_103854.mp3');
        radioAudio.volume = 0.8;
        radioAudio.addEventListener('ended', () => {
            isRadioPlaying = false;
            const radioObj = interactiveObjects.find(obj => {
                const name = (obj.userData.interactiveName || obj.name || '').toLowerCase();
                return name.includes('radio') || name.includes('vintage_radio');
            });
            if (radioObj) toggleRadioState(radioObj, false);
        });
    }
}

function getInteractiveRoot(object) {
    let root = object;
    while (root.parent && root.parent.type !== 'Scene' && !root.userData?.interactive) {
        root = root.parent;
    }
    if (root.userData?.interactive) return root;
    return object;
}

export function updateInteraction(camera) {
    if (interactiveObjects.length === 0) return;

    if (!document.pointerLockElement) {
        if (hoveredObject) {
            resetExitHolding();
            resetHoverEffect(hoveredObject);
            hoveredObject = null;
        }
        return;
    }

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    const validIntersects = intersects.filter(i => i.distance < 20);

    if (validIntersects.length > 0) {
        const hitMesh = validIntersects[0].object;
        const target = getInteractiveRoot(hitMesh);
        if (hoveredObject !== target) {
            resetExitHolding();
            resetHoverEffect(hoveredObject);
            hoveredObject = target;
            applyHoverEffect(hoveredObject);
        }
    } else {
        if (hoveredObject) {
            resetExitHolding();
            resetHoverEffect(hoveredObject);
            hoveredObject = null;
        }
    }
}

function applyHoverEffect(object) {
    if (!object) return;

    if (!object.userData.originalScale) {
        object.userData.originalScale = object.scale.clone();
    }
    object.scale.copy(object.userData.originalScale).multiplyScalar(HOVER_SCALE);

    const name = (object.userData.interactiveName || object.name || '').toLowerCase();

    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive.clone();
            }
            if ((name.includes('radio') || name.includes('vintage_radio')) && isRadioPlaying) {
                child.material.emissive.setHex(0xffdd66);
            } else {
                child.material.emissive.setHex(0x333333);
            }
        }
    });

    // Paintings: show title + description
    if (paintingsRef.includes(object)) {
        const info = object.userData?.info;
        if (info) {
            const desc = info.hoverText
                || (info.description ? info.description.substring(0, 60) + '...' : '');
            const html = `<h3>${info.title || ''}</h3><p>${desc}</p><p class="hint">[ Click để xem chi tiết ]</p>`;
            const panel = document.getElementById('painting-info');
            if (panel) {
                panel.innerHTML = html;
                panel.classList.add('show');
            }
        }
    } else if (name.includes('radio') || name.includes('vintage_radio')) {
        showHoverInfo('Radio cổ', `Click: Bật/tắt phát thanh`);
    }

    // Crosshair highlight
    const crosshair = document.getElementById('crosshair');
    if (crosshair) crosshair.classList.add('hovering');
}

function resetHoverEffect(object) {
    if (!object) return;

    if (object.userData.originalScale) {
        object.scale.copy(object.userData.originalScale);
    }

    const crosshair = document.getElementById('crosshair');
    if (crosshair) crosshair.classList.remove('hovering');

    hideHoverInfo();
}

function triggerInteraction(object) {
    const name = (object.userData.interactiveName || object.name || '').toLowerCase();

    if (name.includes('radio') || name.includes('vintage_radio')) {
        isRadioPlaying = !isRadioPlaying;
        if (radioAudio) {
            if (isRadioPlaying) {
                radioAudio.play().catch(err => console.log('[Radio] Play error:', err));
            } else {
                radioAudio.pause();
            }
        }
        toggleRadioState(object, isRadioPlaying);
    } else if (name.includes('exit_gate')) {
        startExitHolding();
    } else if (paintingsRef.includes(object)) {
        const info = object.userData?.info;
        if (info) openPaintingModal(info);
    }
}

function toggleRadioState(object, turnOn) {
    object.traverse((child) => {
        if (child.isMesh && child.material && child.material.emissive) {
            if (!child.userData.originalEmissive) {
                child.userData.originalEmissive = child.material.emissive.clone();
            }
            if (turnOn) {
                child.userData.originalEmissive.setHex(0xccaa44);
            } else {
                child.userData.originalEmissive.setHex(0x000000);
            }
            if (hoveredObject !== object) {
                child.material.emissive.copy(child.userData.originalEmissive);
            }
        }
    });
}

function startExitHolding() {
    resetExitHolding();

    const progressContainer = document.getElementById('exit-hold-progress-container');
    const progressBar = document.getElementById('exit-hold-progress-bar');
    if (progressContainer) progressContainer.style.display = 'block';

    const startTime = performance.now();

    function updateExitProgress() {
        if (!document.pointerLockElement || !hoveredObject) {
            resetExitHolding();
            return;
        }
        const currentName = (hoveredObject.userData.interactiveName || hoveredObject.name || '').toLowerCase();
        if (!currentName.includes('exit_gate')) {
            resetExitHolding();
            return;
        }

        const elapsed = performance.now() - startTime;
        const pct = Math.min(100, (elapsed / EXIT_HOLD_DURATION) * 100);
        if (progressBar) progressBar.style.width = `${pct}%`;

        if (elapsed >= EXIT_HOLD_DURATION) {
            resetExitHolding();
            triggerEndingModal();
        } else {
            exitHoldTimer = requestAnimationFrame(updateExitProgress);
        }
    }
    exitHoldTimer = requestAnimationFrame(updateExitProgress);
}

function resetExitHolding() {
    if (exitHoldTimer) {
        cancelAnimationFrame(exitHoldTimer);
        exitHoldTimer = null;
    }
    const progressContainer = document.getElementById('exit-hold-progress-container');
    const progressBar = document.getElementById('exit-hold-progress-bar');
    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
}

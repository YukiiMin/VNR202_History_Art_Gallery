import { keysPressed } from "./movement.js";
import { showMenu, hideMenu } from "./menu.js";
import { toggleAudio, startAudio, stopAudio, setVolume, playWingTrack } from "./audioGuide.js";
import { toggleLights } from "./lighting.js";

let lockPointer = true;
let showMenuOnUnlock = false;

// add the controls parameter which is the pointer lock controls and is passed from main.js where setupEventListeners is called
const DEFAULT_KEYS = {
  toggleLights: 'l',
  toggleAudio: 'k',
  toggleMouse: ' ',
  inspectObject: 't',
  showMenu: 'm',
  sprint: 'Shift'
};

// Initialize global customKeys from localStorage or defaults
window.customKeys = (() => {
  try {
    const saved = localStorage.getItem('hcm_gallery_keys');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.sprint) {
        parsed.sprint = 'Shift';
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading custom keys from localStorage:', e);
  }
  return { ...DEFAULT_KEYS };
})();

export const updateHUDKeys = () => {
  const keys = window.customKeys;

  const lLabel = document.querySelector('.key-lights-label');
  const aLabel = document.querySelector('.key-audio-label');
  const iLabel = document.querySelector('.key-inspect-label');
  const mLabel = document.querySelector('.key-menu-label');
  const sLabel = document.querySelector('.key-sprint-label');

  const formatKey = (key) => key === ' ' ? 'SPACE' : key.toUpperCase();

  if (lLabel) lLabel.innerText = `${formatKey(keys.toggleLights)}:`;
  if (aLabel) aLabel.innerText = `${formatKey(keys.toggleAudio)}:`;
  if (iLabel) iLabel.innerText = `${formatKey(keys.inspectObject)}:`;
  if (mLabel) mLabel.innerText = `${formatKey(keys.showMenu)}:`;
  if (sLabel) sLabel.innerText = `${formatKey(keys.sprint)}:`;

  // Also update instructions modal
  const kbdMenu = document.getElementById('kbd_showMenu');
  const kbdLights = document.getElementById('kbd_toggleLights');
  const kbdAudio = document.getElementById('kbd_toggleAudio');
  const kbdInspect = document.getElementById('kbd_inspectObject');
  const kbdMouse = document.getElementById('kbd_toggleMouse');
  const kbdSprint = document.getElementById('kbd_sprint');

  if (kbdMenu) kbdMenu.innerText = formatKey(keys.showMenu);
  if (kbdLights) kbdLights.innerText = formatKey(keys.toggleLights);
  if (kbdAudio) kbdAudio.innerText = formatKey(keys.toggleAudio);
  if (kbdInspect) kbdInspect.innerText = formatKey(keys.inspectObject);
  if (kbdMouse) kbdMouse.innerText = formatKey(keys.toggleMouse);
  if (kbdSprint) kbdSprint.innerText = formatKey(keys.sprint);
};

export const setupEventListeners = (controls, camera, scene) => {
  // Keep lockPointer in sync with actual pointer-lock state
  document.addEventListener('pointerlockchange', () => {
    lockPointer = !!document.pointerLockElement;
  });

  // Update HUD key labels at startup
  updateHUDKeys();

  // add the event listeners to the document which is the whole page
  document.addEventListener(
    "keydown",
    (event) => onKeyDown(event, controls),
    false
  );
  document.addEventListener(
    "keyup",
    (event) => onKeyUp(event, controls),
    false
  );

  controls.addEventListener("unlock", () => {
    if (showMenuOnUnlock) {
      showMenu();
    }
    showMenuOnUnlock = false;
  });

  // Add event listeners for the unified HUD control buttons
  const toggleAudioBtn = document.getElementById("btn_toggle_audio") || document.getElementById("toggle_audio");
  if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener("click", (e) => {
      e.currentTarget.blur(); // Hủy focus để Spacebar không kích hoạt nhầm
      toggleAudio();
    });
  }

  const toggleLightBtn = document.getElementById("toggle_light");
  if (toggleLightBtn) {
    toggleLightBtn.addEventListener("click", (e) => {
      e.currentTarget.blur(); // Hủy focus
      toggleLights();
    });
  }

  // Volume Slider Event
  const volumeSlider = document.getElementById("volume_slider");
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      setVolume(vol);
    });
    volumeSlider.addEventListener("change", (e) => {
      e.target.blur(); // Hủy focus sau khi kéo xong
    });
  }

  // Dropdown Toggle Event
  const dropdownToggle = document.getElementById("btn_dropdown_toggle");
  const dropdownMenu = document.getElementById("track_dropdown_menu");
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện click sủi bọt
      e.currentTarget.blur(); // Hủy focus
      dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    });

    // Tự động đóng dropdown khi click ra ngoài
    document.addEventListener("click", () => {
      dropdownMenu.style.display = "none";
    });
  }

  // Chọn track trong Dropdown Menu
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện click sủi bọt
      e.currentTarget.blur(); // Hủy focus
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      playWingTrack(index);
      if (dropdownMenu) dropdownMenu.style.display = "none"; // Tự động đóng menu sau khi chọn bài
    });
  });
};

// toggle the pointer lock
function togglePointerLock(controls) {
  if (lockPointer) {
    controls.lock();
  } else {
    showMenuOnUnlock = false;
    controls.unlock();
  }
  lockPointer = !lockPointer; // toggle the lockPointer variable
}

function onKeyDown(event, controls) {
  // If user is focusing on an input (rebind input), do not trigger gameplay actions!
  if (document.activeElement && document.activeElement.tagName === 'INPUT') {
    return;
  }

  // event is the event object that has the key property
  if (event.key in keysPressed) {
    // check if the key pressed by the user is in the keysPressed object
    keysPressed[event.key] = true; // if yes, set the value of the key pressed to true
  }

  if (event.key === "Escape") {
    // showMenu() already calls controls.unlock() via bindMenuControls.
    showMenu();
  }

  const keys = window.customKeys;

  const pressedKey = event.key.toLowerCase();

  // Tăng tốc di chuyển (Chạy)
  if (keys && keys.sprint && pressedKey === keys.sprint.toLowerCase()) {
    keysPressed.sprint = true;
  }

  // Phím tắt Bật/Tắt Đèn
  if (pressedKey === keys.toggleLights.toLowerCase()) {
    toggleLights();
  }

  // Phím tắt Bật/Tắt Nhạc
  if (pressedKey === keys.toggleAudio.toLowerCase()) {
    toggleAudio();
  }

  // if key prssed is enter or return for mac
  if (event.key === "Enter" || event.key === "Return") {
    hideMenu();
    controls.lock();
    lockPointer = true;
  }

  // Khóa / nhả chuột
  if (pressedKey === keys.toggleMouse.toLowerCase()) {
    togglePointerLock(controls);
  }

  // Mở menu chính
  if (pressedKey === keys.showMenu.toLowerCase()) {
    showMenu();
  }

  if (pressedKey === "r") {
    location.reload();
  }
}

function onKeyUp(event, controls) {
  // same but for keyup
  if (event.key in keysPressed) {
    keysPressed[event.key] = false; // set to false when the key is released
  }

  const keys = window.customKeys;
  if (keys && keys.sprint) {
    const releasedKey = event.key.toLowerCase();
    if (releasedKey === keys.sprint.toLowerCase()) {
      keysPressed.sprint = false;
    }
  }
}

document.getElementById("toggle-info").addEventListener("click", () => {
  document.getElementById("info-panel").classList.toggle("collapsed");
  document.getElementById("toggle-info").innerText = document
    .getElementById("info-panel")
    .classList.contains("collapsed")
    ? "Hiện"
    : "Ẩn";
});

document.getElementById("about_button").addEventListener("click", function () {
  document.getElementById("about-overlay").classList.add("show");
});

document.getElementById("close-about").addEventListener("click", function () {
  document.getElementById("about-overlay").classList.remove("show");
});

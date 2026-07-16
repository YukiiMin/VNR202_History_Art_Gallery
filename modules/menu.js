import { startAudio } from "./audioGuide.js";

export const hideMenu = () => {
  const menu = document.getElementById('menu');
  if (menu) menu.style.display = 'none'; // Hide the menu

  // Show the HUD controls panel (audio, lights toggle)
  const hudControls = document.getElementById('audio_controls');
  if (hudControls) {
    hudControls.style.display = 'flex';
  }
};

export const showMenu = () => {
  const menu = document.getElementById('menu');
  if (menu) menu.style.display = 'flex'; // Show the menu (using flex to align full-screen container)

  // Hide the HUD controls panel
  const hudControls = document.getElementById('audio_controls');
  if (hudControls) {
    hudControls.style.display = 'none';
  }
};

// Lock the pointer and start tour
export const startExperience = (controls) => {
  controls.lock();
  hideMenu();
  
  // Auto-play BGM
  setTimeout(() => {
    startAudio();
  }, 100);
};

export const setupPlayButton = (controls) => {
  const playButton = document.getElementById('play_button');
  if (playButton) {
    playButton.addEventListener('click', () => startExperience(controls));
  }
};

// Setup all landing page modules
export const setupAboutButton = () => {
  const aboutButton = document.getElementById('about_button');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');

  if (aboutButton && aboutOverlay) {
    aboutButton.addEventListener('click', () => {
      aboutOverlay.classList.add('show');
    });
  }

  if (closeAbout && aboutOverlay) {
    closeAbout.addEventListener('click', () => {
      aboutOverlay.classList.remove('show');
    });
  }

  // 1. Chapter selectors hover details logic
  setupLandingPageChapters();

  // 2. Main menu Settings & Keybindings modal
  initSettingsModal();

  // 3. Main menu credits popup
  setupAuthorInfo();
};

function setupLandingPageChapters() {
  const chapterItems = document.querySelectorAll('.chapter-item');
  const detailTitle = document.getElementById('chapter-detail-title');
  const detailText = document.getElementById('chapter-detail-text');

  chapterItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      // Add active visual state
      chapterItems.forEach(i => i.style.borderColor = 'rgba(201, 168, 76, 0.05)');
      item.style.borderColor = 'rgba(201, 168, 76, 0.4)';

      const num = item.querySelector('.chapter-num').innerText;
      const name = item.querySelector('.chapter-name').innerText;
      const desc = item.getAttribute('data-desc');
      
      if (detailTitle) detailTitle.innerHTML = `${num}: ${name}`;
      if (detailText) detailText.innerHTML = desc;
    });
  });
}

function initSettingsModal() {
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.getElementById('close-settings-btn');
  const saveBtn = document.getElementById('btn_save_settings');
  const resetBtn = document.getElementById('btn_reset_keys');
  const errorMsg = document.getElementById('settings_error_msg');
  const inputs = document.querySelectorAll('.keybind-input');
  
  const volumeSlider = document.getElementById('settings_volume_slider');
  const hudVolumeSlider = document.getElementById('volume_slider');

  if (!modal) return;

  // Format keys visually
  const formatKeyName = (key) => {
    if (key === ' ') return 'SPACE';
    return key.toUpperCase();
  };

  // Populate inputs with current customKeys on modal open
  const populateInputs = () => {
    const keys = window.customKeys;
    inputs.forEach(input => {
      const action = input.getAttribute('data-action');
      const val = keys[action];
      input.value = formatKeyName(val);
      input.setAttribute('data-key', val); // Keep raw key value in attribute
    });

    // Populate volume values
    const currentVol = parseFloat(localStorage.getItem('hcm_gallery_volume') || '0.35');
    if (volumeSlider) volumeSlider.value = currentVol;
    if (hudVolumeSlider) hudVolumeSlider.value = currentVol;
  };

  // Open settings modal from Landing Menu button
  const settingsBtn = document.getElementById('btn_toggle_hud_volume');
  if (settingsBtn) {
    settingsBtn.style.cursor = 'pointer';
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      populateInputs();
      if (errorMsg) errorMsg.style.display = 'none';
      modal.style.display = 'flex';
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Handle key capture on inputs
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.value = '...';
      input.style.borderColor = 'var(--color-gold)';
    });

    input.addEventListener('blur', () => {
      const rawKey = input.getAttribute('data-key') || ' ';
      input.value = formatKeyName(rawKey);
      input.style.borderColor = 'var(--color-gold-dim)';
    });

    input.addEventListener('keydown', (e) => {
      e.preventDefault(); // Stop default action
      e.stopPropagation();

      const pressedKey = e.key;

      // Disallow Escape, Enter to avoid trapping/conflicts
      if (pressedKey === 'Escape' || pressedKey === 'Enter') {
        input.blur();
        return;
      }

      // Store lower/raw value, and show clean visual text
      const rawValue = pressedKey === ' ' ? ' ' : pressedKey.toLowerCase();
      input.setAttribute('data-key', rawValue);
      input.value = formatKeyName(pressedKey);

      input.blur(); // Autocomplete rebind
    });
  });

  // Save Settings
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Validate duplicates
      const keyMap = {};
      let hasDuplicate = false;
      const proposedKeys = {};

      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const action = input.getAttribute('data-action');
        const key = input.getAttribute('data-key');

        proposedKeys[action] = key;

        if (keyMap[key]) {
          hasDuplicate = true;
          if (errorMsg) {
            errorMsg.innerText = `LỖI: Phím '${formatKeyName(key)}' đã bị gán trùng cho nhiều hành động! Vui lòng chọn phím khác.`;
            errorMsg.style.display = 'block';
          }
          return;
        }
        keyMap[key] = action;
      }

      // If no duplicates, save
      if (errorMsg) errorMsg.style.display = 'none';
      
      // Update global keys
      window.customKeys = { ...proposedKeys };
      localStorage.setItem('hcm_gallery_keys', JSON.stringify(window.customKeys));

      // Update volume
      if (volumeSlider) {
        const volVal = parseFloat(volumeSlider.value);
        localStorage.setItem('hcm_gallery_volume', volVal.toString());
        import('./audioGuide.js').then(module => {
          module.setVolume(volVal);
        });
        if (hudVolumeSlider) hudVolumeSlider.value = volVal;
      }

      // Dynamic refresh HUD keys on-screen
      import('./eventListeners.js').then(module => {
        module.updateHUDKeys();
      });

      // Display premium saved animation or close
      saveBtn.innerText = 'ĐÃ LƯU ✓';
      saveBtn.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';
      saveBtn.style.color = '#fff';
      
      setTimeout(() => {
        saveBtn.innerText = 'Lưu Lại';
        saveBtn.style.background = '';
        saveBtn.style.color = '';
        modal.style.display = 'none';
      }, 800);
    });
  }

  // Reset keys to default
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const DEFAULT_KEYS = {
        toggleLights: 'l',
        toggleAudio: 'k',
        toggleMouse: ' ',
        inspectObject: 't',
        showMenu: 'm',
        sprint: 'Shift'
      };

      inputs.forEach(input => {
        const action = input.getAttribute('data-action');
        const defaultVal = DEFAULT_KEYS[action];
        if (defaultVal !== undefined) {
          input.setAttribute('data-key', defaultVal);
          input.value = formatKeyName(defaultVal);
        }
      });

      if (errorMsg) errorMsg.style.display = 'none';
      console.log('[Settings] Reset rebound values to defaults.');
    });
  }

  // Volume sliders cross sync
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      import('./audioGuide.js').then(module => {
        module.setVolume(val);
      });
      if (hudVolumeSlider) hudVolumeSlider.value = val;
    });
  }
}

function setupAuthorInfo() {
  const authorBtn = document.getElementById('btn_open_author');
  const authorOverlay = document.getElementById('author-overlay');
  const closeAuthor = document.getElementById('close-author');

  if (authorBtn && authorOverlay) {
    authorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      authorOverlay.classList.add('show');
    });
  }

  if (closeAuthor && authorOverlay) {
    closeAuthor.addEventListener('click', (e) => {
      e.stopPropagation();
      authorOverlay.classList.remove('show');
    });
  }
}

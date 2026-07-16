import * as THREE from "three";

// ── Audio state ───────────────────────────────────────────────
let bgSound;          // Nhạc nền ambient chạy vòng lặp
let bufferLoaded = false;
let audioContext;
let listener;

// Danh sách nhạc đầy đủ 4 bài - Tiersen làm BGM mặc định
const WING_TRACKS = [
  "/sounds/tiersen.mp3",
  "/sounds/TheBalladOfHoChiMinh_Ewan-Maccoll.mp3",
  "/sounds/Nguoi-La-Niem-Tin-Tat-Thang.mp3",
  "/sounds/Dem-Nghe-Hat-Do-Dua-Nho-Bac.mp3",
];

let currentTrackIndex = 0;
let currentVolume = parseFloat(localStorage.getItem('hcm_gallery_volume') || '0.35');

// ── Cập nhật trạng thái nút UI ──────────────────────────────────
const updateUIButton = () => {
  const btn = document.getElementById("btn_toggle_audio") || document.getElementById("toggle_audio");
  if (btn) {
    if (bgSound && bgSound.isPlaying) {
      btn.innerHTML = "⏸ Tạm dừng nhạc";
      btn.classList.add("playing");
    } else {
      btn.innerHTML = "🎵 Phát nhạc nền";
      btn.classList.remove("playing");
    }
  }
};

// ── Setup audio system gắn vào camera ─────────────────────────
export const setupAudio = (camera) => {
  listener = new THREE.AudioListener();
  camera.add(listener);

  bgSound = new THREE.Audio(listener);

  // Load track đầu tiên làm nhạc nền (tiersen.mp3)
  const audioLoader = new THREE.AudioLoader();
  console.log("[Audio] Loading background music:", WING_TRACKS[0]);
  
  audioLoader.load(
    WING_TRACKS[0], 
    function (buffer) {
      bgSound.setBuffer(buffer);
      bgSound.setLoop(true);
      bgSound.setVolume(currentVolume);  // Âm lượng vừa đủ
      bufferLoaded = true;
      console.log("[Audio] Background music loaded successfully:", WING_TRACKS[0]);
      updateUIButton();
    },
    // On progress
    undefined,
    // On error
    function (err) {
      console.error("[Audio] Failed to load audio file:", WING_TRACKS[0], err);
    }
  );
};

// ── Bật nhạc nền ─────────────────────────────────────────────
export const startAudio = () => {
  if (bgSound && bufferLoaded && !bgSound.isPlaying) {
    bgSound.play();
    console.log("[Audio] Playing background music");
    updateUIButton();
  } else if (bgSound && !bufferLoaded) {
    console.warn("[Audio] Audio buffer is still loading, please wait...");
  }
};

// ── Tắt nhạc nền ─────────────────────────────────────────────
export const stopAudio = () => {
  if (bgSound && bgSound.isPlaying) {
    bgSound.pause();
    console.log("[Audio] Paused background music");
    updateUIButton();
  }
};

// ── Toggle nhạc nền ───────────────────────────────────────────
export const toggleAudio = () => {
  if (!bgSound) return false;
  if (bgSound.isPlaying) {
    stopAudio();
    return false;
  } else {
    startAudio();
    return true;
  }
};

// ── Cài đặt âm lượng ─────────────────────────────────────────
export const setVolume = (val) => {
  currentVolume = val;
  if (bgSound) {
    bgSound.setVolume(val);
  }
};

// ── Chuyển sang track khác ────────────────────────────────────
export const playWingTrack = (trackIndex) => {
  if (trackIndex < 0 || trackIndex >= WING_TRACKS.length) return;
  
  currentTrackIndex = trackIndex;
  bufferLoaded = false;
  updateUIButton();

  const btn = document.getElementById("btn_toggle_audio") || document.getElementById("toggle_audio");
  if (btn) btn.innerHTML = "🎵 Đang tải nhạc...";

  if (bgSound) {
    if (bgSound.isPlaying) {
      bgSound.stop();
    }
  } else {
    return;
  }

  const audioLoader = new THREE.AudioLoader();
  console.log("[Audio] Switching to track:", WING_TRACKS[trackIndex]);
  
  audioLoader.load(
    WING_TRACKS[trackIndex], 
    function (buffer) {
      bgSound.setBuffer(buffer);
      bgSound.setLoop(true);
      bgSound.setVolume(currentVolume);
      bgSound.play();
      bufferLoaded = true;
      console.log("[Audio] Switched and playing track:", WING_TRACKS[trackIndex]);
      updateUIButton();
      
      // Đồng bộ hóa trạng thái active trong Dropdown UI
      document.querySelectorAll(".dropdown-item").forEach((item, index) => {
        if (index === trackIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    },
    undefined,
    function (err) {
      console.error("[Audio] Failed to switch track:", WING_TRACKS[trackIndex], err);
      if (btn) btn.innerHTML = "⚠️ Lỗi tải nhạc";
    }
  );
};


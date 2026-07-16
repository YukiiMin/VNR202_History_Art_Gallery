/**
 * loadComponents.js — Bootstrap game sau khi DOM đã sẵn sàng
 *
 * Tất cả component HTML đã được inline trong index.html.
 * Script này chỉ phát event 'components:all-loaded' rồi import main.js.
 */

async function bootstrapGame() {
  window.dispatchEvent(new CustomEvent('components:all-loaded'));
  try {
    await import('./main.js');
  } catch (err) {
    console.error('[loadComponents] Lỗi import main.js:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapGame, { once: true });
} else {
  bootstrapGame();
}

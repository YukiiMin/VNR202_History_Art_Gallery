/**
 * loadComponents.js — Load các file component HTML vào các slot trong index.html
 *
 * Cơ chế:
 *   - Duyệt qua COMPONENT_SLOTS (id slot -> đường dẫn file .html).
 *   - fetch() từng file, gán innerHTML vào slot tương ứng.
 *   - Sau khi load xong từng component: phát CustomEvent 'component:loaded:<name>'
 *     để module JS khác bắt được (ví dụ modules/menu.js muốn gắn event cho menu chính).
 *   - Khi load xong tất cả: phát CustomEvent 'components:all-loaded' trên window.
 *   - Cuối cùng dynamic import() /main.js để game khởi động.
 *
 * Lý do dùng dynamic import thay vì <script type="module"> trực tiếp:
 *   /main.js và các module của nó (modules/menu.js, modules/eventListeners.js, v.v.)
 *   gọi getElementById ngay khi import. Nếu DOM chưa có component, chúng sẽ fail.
 *   Dynamic import sau khi DOM sẵn sàng đảm bảo selector luôn tìm thấy element.
 */

const COMPONENT_SLOTS = [
  { slotId: 'component-slot-header-logo', file: './components/header-logo.html', name: 'header-logo' },
  { slotId: 'component-slot-intro-menu', file: './components/intro-menu.html', name: 'intro-menu' },
  { slotId: 'component-slot-hud-overlay', file: './components/hud-overlay.html', name: 'hud-overlay' },
  { slotId: 'component-slot-info-panel', file: './components/info-panel.html', name: 'info-panel' },
  { slotId: 'component-slot-settings-modal', file: './components/settings-modal.html', name: 'settings-modal' },
  { slotId: 'component-slot-about-modal', file: './components/about-modal.html', name: 'about-modal' },
  { slotId: 'component-slot-exit-progress', file: './components/exit-progress.html', name: 'exit-progress' },
];

/**
 * Fetch một file HTML và trả về text. Throw lỗi nếu response không ok.
 */
async function fetchComponent(file) {
  const res = await fetch(file, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Fetch ${file} thất bại: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

/**
 * Load tất cả component song song. Lỗi của một component sẽ log nhưng không chặn các cái khác.
 */
async function loadAllComponents() {
  const tasks = COMPONENT_SLOTS.map(async ({ slotId, file, name }) => {
    const slot = document.getElementById(slotId);
    if (!slot) {
      console.warn(`[loadComponents] Không tìm thấy slot #${slotId} trong index.html`);
      return;
    }
    try {
      const html = await fetchComponent(file);
      slot.innerHTML = html;
      // Phát 2 event: một tổng quát và một riêng theo tên component.
      // Bubble lên window để các module JS khác dễ bắt.
      window.dispatchEvent(new CustomEvent('component:loaded', { detail: { name, slotId } }));
      window.dispatchEvent(new CustomEvent(`component:loaded:${name}`, { detail: { slotId } }));
      console.info(`[loadComponents] Loaded: ${name}`);
    } catch (err) {
      console.error(`[loadComponents] Lỗi load ${name}:`, err);
    }
  });
  await Promise.all(tasks);
}

/**
 * Khởi động game sau khi mọi component đã load xong.
 */
async function bootstrapGame() {
  await loadAllComponents();
  window.dispatchEvent(new CustomEvent('components:all-loaded'));
  // Dynamic import main.js — chạy sau khi DOM đã có đầy đủ id mà các module query.
  try {
    await import('../main.js');
  } catch (err) {
    console.error('[loadComponents] Lỗi import main.js:', err);
  }
}

// Chạy khi DOM sẵn sàng (slot div đã có trong index.html).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapGame, { once: true });
} else {
  bootstrapGame();
}

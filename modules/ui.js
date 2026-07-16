// modules/ui.js — Single source of truth for all modal + hover-info DOM mutations.
// All callers (modules/interaction.js, modules/gates.js, etc.) MUST go through these helpers
// and never write `modalContent.innerHTML` directly. This keeps the modal template consistent
// and prevents drift between painting modal and historical-info modal.

let controlsRef = null;

export function bindControls(controls) {
    controlsRef = controls || null;
}

export function showModal(html) {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    if (modal && content) {
        content.innerHTML = html;
        modal.classList.add('active');
        modal.style.display = 'flex';
        if (controlsRef) controlsRef.unlock();
        if (document.pointerLockElement) document.exitPointerLock();
    }
}

export function hideModal() {
    const modal = document.getElementById('infoModal');
    if (!modal) return;
    if (modal.style.display === 'none' || modal.style.display === '') return;
    modal.style.display = 'none';
    modal.classList.remove('active');
    if (controlsRef) {
        setTimeout(() => {
            if (controlsRef) controlsRef.lock();
        }, 100);
    }
}

export function closeModalSafely() {
    const modal = document.getElementById('infoModal');
    if (modal) hideModal();
}

export function showHoverInfo(title, description) {
    const infoPanel = document.getElementById('painting-info');
    if (infoPanel) {
        infoPanel.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        infoPanel.classList.add('show');
    }
}

export function hideHoverInfo() {
    const infoPanel = document.getElementById('painting-info');
    if (infoPanel) {
        infoPanel.classList.remove('show');
    }
}

// ── Modal templates ─────────────────────────────────────────────
// Build an HTML payload from a structured info object. Centralizing the markup
// here ensures both painting modals and historical prop modals share the same
// visual language and reduce duplicate template code at call sites.

function quoteBlock(quote) {
    return quote
        ? `<blockquote class="modal-quote">${String(quote).replace(/\n/g, '<br>')}</blockquote>`
        : '';
}

export function paintingModalHTML(info) {
    if (!info) return '';
    return `
        <div class="modal-tag">${info.tag || 'Hiện vật trưng bày'}</div>
        <h2>${info.title || ''}</h2>
        <p class="modal-meta">${info.artist || ''} · ${info.year || ''}</p>
        <div class="modal-divider"></div>
        <p class="modal-body">${(info.description || '').replace(/\n/g, '<br><br>')}</p>
        ${quoteBlock(info.quote)}
    `;
}

export function historicalModalHTML(info) {
    if (!info) return '';
    return `
        <div class="modal-tag">${info.tag || 'Hiện vật tương tác'}</div>
        <h2>${info.title || ''}</h2>
        <p class="modal-meta">${info.meta || ''}</p>
        <div class="modal-divider"></div>
        <p class="modal-body">${(info.description || '').replace(/\n/g, '<br><br>')}</p>
        ${quoteBlock(info.quote)}
    `;
}

// High-level openers that combine template + showModal in one call.
// Callers (interaction.js, gates.js) just pass info, no need to know HTML.

export function openPaintingModal(info) {
    showModal(paintingModalHTML(info));
}

export function openHistoricalModal(info) {
    showModal(historicalModalHTML(info));
}
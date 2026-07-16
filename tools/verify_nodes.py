"""Dem cac the quan trong (khong phai id) de dam bao khong mat."""
import re, subprocess, os, sys
ROOT = r"d:\Minh\FU_Learning\HCM202\Help-Vinh\HCM202-HCM_Digital_Art_Gallery"
os.chdir(ROOT)

orig = subprocess.check_output(["git", "show", "HEAD:index.html"], text=True, encoding="utf-8")
new = ""
for f in ["components/header-logo.html","components/intro-menu.html","components/about-modal.html","components/hud-overlay.html","components/info-panel.html","components/settings-modal.html","components/exit-progress.html"]:
    new += open(f, encoding="utf-8").read() + "\n"

def counts(txt):
    return {
        "class=chapter-item": txt.count('class="chapter-item"'),
        "class=chapter-num": txt.count('class="chapter-num"'),
        "class=chapter-name": txt.count('class="chapter-name"'),
        "class=ai-card": txt.count('class="ai-card"'),
        "class=control-item": txt.count('class="control-item"'),
        "class=wing-item": txt.count('class="wing-item"'),
        "class=dropdown-item": txt.count('class="dropdown-item"'),
        "class=keybind-input": txt.count('class="keybind-input"'),
        "chapter-detail-title": txt.count('id="chapter-detail-title"'),
    }

o = counts(orig)
n = counts(new)
sys.stdout.buffer.write(f"{'item':40s} {'orig':>6s} {'new':>6s}\n".encode('utf-8'))
for k in o:
    sys.stdout.buffer.write(f"{k:40s} {o[k]:>6d} {n.get(k,0):>6d}\n".encode('utf-8'))
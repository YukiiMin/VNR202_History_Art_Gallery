"""Tach index.html thanh cac component file. Chay mot lan."""
import re
from pathlib import Path

ROOT = Path(r"d:\Minh\FU_Learning\HCM202\Help-Vinh\HCM202-HCM_Digital_Art_Gallery")
src = (ROOT / "index.html").read_text(encoding="utf-8")

# Mo bang dau bang comment dac trung
def slice_between(start_marker, end_marker):
    i = src.index(start_marker)
    j = src.index(end_marker, i)
    # back up to start of line of start_marker
    line_start = src.rfind("\n", 0, i) + 1
    # find end of line for end_marker
    line_end = src.find("\n", j)
    return src[line_start:line_end].rstrip()

# === header-logo: tu comment WEBSITE LOGO den truoc INTRO SCREEN ===
header = slice_between(
    "<!-- ============================================================ -->\n    <!-- WEBSITE LOGO",
    "<!-- ============================================================ -->\n    <!-- INTRO SCREEN",
)
(ROOT / "components" / "header-logo.html").write_text(header + "\n", encoding="utf-8")

# === intro-menu: tu comment INTRO SCREEN (cuc AAA Game Style) den truoc ABOUT OVERLAY ===
intro = slice_between(
    "<!-- ============================================================ -->\n    <!-- INTRO SCREEN — AAA Game Style Landing Page Menu",
    "<!-- ============================================================ -->\n    <!-- ABOUT OVERLAY",
)
(ROOT / "components" / "intro-menu.html").write_text(intro + "\n", encoding="utf-8")

# === about-modal: ABOUT OVERLAY + AUTHOR OVERLAY (gom ca hai) ===
about = slice_between(
    "<!-- ============================================================ -->\n    <!-- ABOUT OVERLAY",
    "<!-- ============================================================ -->\n    <!-- IN-GAME UI ELEMENTS",
)
(ROOT / "components" / "about-modal.html").write_text(about + "\n", encoding="utf-8")

# === hud-overlay: info-panel + audio_controls + painting-info + crosshair + infoModal ===
hud_start = src.index("<!-- Controls Info Panel -->")
hud_end = src.index("<!-- Settings & Keybindings Modal -->")
hud = src[hud_start:hud_end].rstrip()
(ROOT / "components" / "hud-overlay.html").write_text(hud + "\n", encoding="utf-8")

# === info-panel: tach rieng cung duoc nhung gop vao hud ===
# (bo qua rieng)

# === settings-modal: tu Settings den truoc Exit Hold Progress ===
settings_start = src.index("<!-- Settings & Keybindings Modal -->")
settings_end = src.index("<!-- Exit Hold Progress Bar -->")
settings = src[settings_start:settings_end].rstrip()
(ROOT / "components" / "settings-modal.html").write_text(settings + "\n", encoding="utf-8")

# === exit-progress: tu Exit Hold Progress Bar den </body> ===
exit_start = src.index("<!-- Exit Hold Progress Bar -->")
exit_end = src.rindex("</body>")
exit_block = src[exit_start:exit_end].rstrip()
(ROOT / "components" / "exit-progress.html").write_text(exit_block + "\n", encoding="utf-8")

print("OK")
for p in sorted((ROOT / "components").glob("*.html")):
    print(f"{p.name}: {len(p.read_text(encoding='utf-8').splitlines())} lines")
"""Tach info-panel.html rieng khoi hud-overlay.html."""
from pathlib import Path
ROOT = Path(r"d:\Minh\FU_Learning\HCM202\Help-Vinh\HCM202-HCM_Digital_Art_Gallery")
hud = (ROOT / "components" / "hud-overlay.html").read_text(encoding="utf-8")

# Cat khoi dau den het info-panel (truoc comment Audio & Light Quick HUD Controls)
i = hud.index("<!-- Controls Info Panel -->")
j = hud.index("<!-- Audio & Light Quick HUD Controls -->")
info_panel = hud[i:j].rstrip() + "\n"
remainder = (hud[:i] + hud[j:]).strip() + "\n"

(ROOT / "components" / "info-panel.html").write_text(info_panel, encoding="utf-8")
(ROOT / "components" / "hud-overlay.html").write_text(remainder, encoding="utf-8")
print("info-panel.html:", len(info_panel.splitlines()))
print("hud-overlay.html:", len(remainder.splitlines()))
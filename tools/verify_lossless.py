"""Kiem tra: cac id co trong index.html goc nhung khong co trong components moi -> mat."""
import re, glob, subprocess, os, sys
ROOT = r"d:\Minh\FU_Learning\HCM202\Help-Vinh\HCM202-HCM_Digital_Art_Gallery"
os.chdir(ROOT)

original = subprocess.check_output(
    ["git", "show", "HEAD:index.html"], text=True, encoding="utf-8"
)
ids = set(re.findall(r'id="([^"]+)"', original))
sys.stdout.buffer.write(f"IDs in original index.html (git HEAD): {len(ids)}\n".encode('utf-8'))

ids_new = set()
for f in glob.glob("components/*.html"):
    for m in re.findall(r'id="([^"]+)"', open(f, encoding="utf-8").read()):
        ids_new.add(m)
for m in re.findall(r'id="([^"]+)"', open("index.html", encoding="utf-8").read()):
    ids_new.add(m)
slot_ids = {"component-slot-"+n for n in ['header-logo','intro-menu','hud-overlay','info-panel','settings-modal','about-modal','exit-progress']}
ids_new -= slot_ids
sys.stdout.buffer.write(f"IDs in new (minus slot ids): {len(ids_new)}\n".encode('utf-8'))

lost = ids - ids_new
extra = ids_new - ids
sys.stdout.buffer.write(f"LOST: {sorted(lost) if lost else 'NONE'}\n".encode('utf-8'))
sys.stdout.buffer.write(f"NEW: {sorted(extra) if extra else 'NONE'}\n".encode('utf-8'))
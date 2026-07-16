"""Verify tat ca id ma JS query deu co mat trong components hoac index."""
import re, glob

ROOT = r"d:\Minh\FU_Learning\HCM202\Help-Vinh\HCM202-HCM_Digital_Art_Gallery"
import os
os.chdir(ROOT)

ids_needed = set()
for f in glob.glob("modules/*.js") + glob.glob("src/*.js"):
    txt = open(f, encoding="utf-8").read()
    for m in re.findall(r'getElementById\(["\']([^"\']+)["\']\)', txt):
        ids_needed.add(m)
print("IDs queried by JS:", sorted(ids_needed))
print("Total:", len(ids_needed))

ids_in_html = set()
for f in glob.glob("components/*.html"):
    for m in re.findall(r'id=["\']([^"\']+)["\']', open(f, encoding="utf-8").read()):
        ids_in_html.add(m)
for m in re.findall(r'id=["\']([^"\']+)["\']', open("index.html", encoding="utf-8").read()):
    ids_in_html.add(m)

missing = sorted(ids_needed - ids_in_html)
print()
print("MISSING (JS query but not in HTML):", missing if missing else "NONE")
print()
extra = sorted(ids_in_html - ids_needed)
print("Extra IDs (declared but JS does not query - normal):", extra)
print("Total declared:", len(ids_in_html))
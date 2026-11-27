"""Clean a saved HTML page: drop scripts/trackers, keep only internal links.

Usage: python3 clean_page.py <input.html> <output.html> <original-domain>
Links to <original-domain>/path become /path; every other external link is removed.
"""
import re
import sys
from bs4 import BeautifulSoup, Comment

src, dst, domain = sys.argv[1], sys.argv[2], sys.argv[3]
soup = BeautifulSoup(open(src, encoding="utf-8").read(), "lxml")

for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
    c.extract()
for tag in soup.find_all(["script", "noscript", "iframe"]):
    tag.decompose()
for tag in soup.select(".grecaptcha-badge"):
    tag.decompose()
for meta in soup.find_all("meta", attrs={"http-equiv": True}):
    meta.decompose()
for link in soup.find_all("link"):
    if "icon" not in (link.get("rel") or []) and "stylesheet" not in (link.get("rel") or []):
        link.decompose()

internal = re.compile(r"^https?://(www\.)?" + re.escape(domain) + r"(/[^?#]*)?", re.I)
for a in soup.find_all(href=True):
    if a.name != "a":
        continue
    href = a["href"].strip()
    m = internal.match(href)
    if m:
        path = (m.group(2) or "/").rstrip("/").lower() or "/"
        a["href"] = path
        a["target"] = "_top"
    elif href.startswith("#"):
        continue
    else:
        del a["href"]
        a.attrs.pop("target", None)
        a.attrs.pop("rel", None)
    for k in ("onclick",):
        a.attrs.pop(k, None)

head = soup.head or soup.new_tag("head")
base = soup.new_tag("base", target="_top")
head.insert(0, base)
open(dst, "w", encoding="utf-8").write(str(soup))
print("ok", dst)

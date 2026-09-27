import re, json

with open('public/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'<select id="lang-select"[^>]*>(.*?)</select>', html, re.DOTALL)
if m:
    opts = re.findall(r'value="([^"]+)"[^>]*>([^<]+)', m.group(1))
    print('Options in index.html lang-select:', opts)

m2 = re.search(r'<select id="splash-lang-select"[^>]*>(.*?)</select>', html, re.DOTALL)
if m2:
    opts2 = re.findall(r'value="([^"]+)"[^>]*>([^<]+)', m2.group(1))
    print('Options in index.html splash-lang-select:', opts2)

with open('public/guest.html', 'r', encoding='utf-8') as f:
    gh = f.read()
m3 = re.search(r'<select id="guest-lang-select"[^>]*>(.*?)</select>', gh, re.DOTALL)
if m3:
    opts3 = re.findall(r'value="([^"]+)"[^>]*>([^<]+)', m3.group(1))
    print('Options in guest.html guest-lang-select:', opts3)

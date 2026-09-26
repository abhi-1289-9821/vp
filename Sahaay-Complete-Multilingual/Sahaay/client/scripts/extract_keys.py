import re
import json
import os

with open('src/locales/en.ts', 'r', encoding='utf-8') as f:
    en_content = f.read()

with open('src/locales/hi.ts', 'r', encoding='utf-8') as f:
    hi_content = f.read()

def parse_ts_dict(content):
    res = {}
    pattern = re.compile(r'^\s+([a-zA-Z0-9_]+):\s*(?:\'([^\']*)\'|"([^"]*)"|`([^`]*)`),?', re.MULTILINE)
    for m in pattern.finditer(content):
        key = m.group(1)
        val = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
        res[key] = val
    return res

en_map = parse_ts_dict(en_content)
hi_map = parse_ts_dict(hi_content)

print(f"EN keys parsed: {len(en_map)}")
print(f"HI keys parsed: {len(hi_map)}")

with open('scripts/en_hi_dump.json', 'w', encoding='utf-8') as f:
    json.dump({'en': en_map, 'hi': hi_map, 'keys': list(en_map.keys())}, f, ensure_ascii=False, indent=2)

print("Dumped to scripts/en_hi_dump.json successfully.")

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from locale_writer import write_locale, ALL_KEYS

# Base dictionaries loaded from schema
with open(os.path.join(os.path.dirname(__file__), 'en_hi_dump.json'), 'r', encoding='utf-8') as f:
    dump = json.load(f)
    en_ref = dump['en']
    hi_ref = dump['hi']

# Load Tamil reference
with open(os.path.join(os.path.dirname(__file__), '..', 'src', 'locales', 'locales', 'ta.ts'), 'r', encoding='utf-8') as f:
    ta_content = f.read()

import re
pattern = re.compile(r'^\s+([a-zA-Z0-9_]+):\s*(?:\'([^\']*)\'|"([^"]*)"|`([^`]*)`),?', re.MULTILINE)
ta_map = {}
for m in pattern.finditer(ta_content):
    k = m.group(1)
    v = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
    ta_map[k] = v

print(f"Loaded Tamil reference: {len(ta_map)} keys")
write_locale('ta', 'Tamil (தமிழ்)', ta_map)

print("Part 1 base loaded successfully.")

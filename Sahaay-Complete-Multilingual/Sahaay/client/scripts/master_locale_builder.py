import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from locale_writer import write_locale, ALL_KEYS

# Load En & Hi
with open('scripts/en_hi_dump.json', 'r', encoding='utf-8') as f:
    dump = json.load(f)
    ALL_KEYS = dump['keys']
    EN = dump['en']
    HI = dump['hi']

# Load base maps
with open('scripts/extracted_base_maps.json', 'r', encoding='utf-8') as f:
    BASE_MAPS = json.load(f)

# Load Tamil
with open('src/locales/locales/ta.ts', 'r', encoding='utf-8') as f:
    ta_content = f.read()

pattern = re.compile(r'^\s+([a-zA-Z0-9_]+):\s*(?:\'([^\']*)\'|"([^"]*)"|`([^`]*)`),?', re.MULTILINE)
ta_dict = {}
for m in pattern.finditer(ta_content):
    k = m.group(1)
    v = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
    ta_dict[k] = v

print(f"Loaded master schema: {len(ALL_KEYS)} keys. Master Tamil: {len(ta_dict)} keys.")

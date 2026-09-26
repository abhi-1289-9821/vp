import re
import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

files = [
    'scripts/gen-indo-aryan-1.ts',
    'scripts/gen-group-3.ts',
    'scripts/gen-group-4.ts',
    'scripts/gen-dravidian.ts',
    'scripts/gen-bn-mr-gu-pa.ts'
]

with open('scripts/en_hi_dump.json', 'r', encoding='utf-8') as f:
    dump = json.load(f)
    ALL_KEYS = dump['keys']

for fp in files:
    if not os.path.exists(fp):
        continue
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # find functions
    funcs = re.findall(r'export function (\w+)\(\)\s*\{([^}]+(?:\{[^}]+\}[^}]+)*)\}', content)
    print(f"\n--- {fp} (size: {len(content)} bytes) ---")
    
    # find all writeLocale calls
    writes = re.findall(r"writeLocale\('([^']+)',\s*'([^']+)'", content)
    print(f"Write calls: {writes}")
    
    # inspect keys in each function
    blocks = re.split(r'export function ', content)
    for b in blocks[1:]:
        header = b.split('(')[0]
        keys_in_block = re.findall(r'^\s+([a-zA-Z0-9_]+):', b, re.MULTILINE)
        matched_keys = [k for k in keys_in_block if k in ALL_KEYS]
        missing_keys = [k for k in ALL_KEYS if k not in keys_in_block]
        print(f"  Function {header}: {len(matched_keys)}/{len(ALL_KEYS)} keys (missing: {len(missing_keys)})")


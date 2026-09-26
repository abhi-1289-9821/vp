import re
import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/en_hi_dump.json', 'r', encoding='utf-8') as f:
    dump = json.load(f)
    ALL_KEYS = dump['keys']

def extract_from_file(filepath):
    if not os.path.exists(filepath):
        return {}
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by functions
    blocks = re.split(r'export function (\w+)', content)
    res = {}
    for i in range(1, len(blocks), 2):
        fn_name = blocks[i]
        fn_body = blocks[i+1]
        kvs = {}
        pattern = re.compile(r'^\s+([a-zA-Z0-9_]+):\s*(?:\'([^\']*)\'|"([^"]*)"|`([^`]*)`),?', re.MULTILINE)
        for m in pattern.finditer(fn_body):
            k = m.group(1)
            v = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
            kvs[k] = v
        res[fn_name] = kvs
    return res

existing = {
    'dravidian': extract_from_file('scripts/gen-dravidian.ts'),
    'indo_aryan_1': extract_from_file('scripts/gen-indo-aryan-1.ts'),
    'group_3': extract_from_file('scripts/gen-group-3.ts'),
    'group_4': extract_from_file('scripts/gen-group-4.ts'),
    'bn_mr_gu_pa': extract_from_file('scripts/gen-bn-mr-gu-pa.ts'),
    'regional_ts': extract_from_file('src/locales/regional.ts')
}

with open('scripts/extracted_base_maps.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print("Extracted all existing translations into scripts/extracted_base_maps.json")

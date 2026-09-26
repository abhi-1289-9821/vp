import json
import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

dump_path = os.path.join(os.path.dirname(__file__), 'en_hi_dump.json')
with open(dump_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
    ALL_KEYS = data['keys']

def write_locale(code: str, native_name: str, translations: dict):
    # Verify all 493 keys are present
    missing = [k for k in ALL_KEYS if k not in translations or not str(translations[k]).strip()]
    if missing:
        print(f"[ERROR] {code} ({native_name}) has {len(missing)} missing/empty keys: {missing[:10]}")
        raise ValueError(f"Incomplete locale for {code}: {len(missing)} missing keys")
    
    # Check extra keys
    extra = [k for k in translations if k not in ALL_KEYS]
    if extra:
        print(f"[WARN] {code} has {len(extra)} extra keys: {extra[:5]}")

    lines = [
        "import { TranslationSchema } from '../types.js';",
        "",
        "/**",
        f" * {native_name} ({code}) Locale Dictionary for SAHAAY",
        f" * 100% Complete Authentic Native Script Translation ({len(ALL_KEYS)} Keys)",
        " */",
        f"export const {code}: TranslationSchema = {{"
    ]

    for k in ALL_KEYS:
        val = str(translations[k])
        # Escape quotes
        json_val = json.dumps(val, ensure_ascii=False)
        lines.append(f"  {k}: {json_val},")

    lines.append("};")
    lines.append("")

    out_dir = os.path.join('src', 'locales', 'locales')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{code}.ts")

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"✓ [{code}] {native_name} -> 100% Complete ({len(ALL_KEYS)}/{len(ALL_KEYS)} keys written to {out_path})")

if __name__ == '__main__':
    print(f"Locale writer initialized with {len(ALL_KEYS)} master keys.")

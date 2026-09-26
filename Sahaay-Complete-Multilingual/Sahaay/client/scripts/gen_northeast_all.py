import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from locale_writer import write_locale, ALL_KEYS

with open('scripts/en_hi_dump.json', 'r', encoding='utf-8') as f:
    dump = json.load(f)
    ALL_KEYS = dump['keys']
    EN = dump['en']
    HI = dump['hi']

with open('scripts/extracted_base_maps.json', 'r', encoding='utf-8') as f:
    BASE = json.load(f)

BASE_G4 = BASE.get('group_4', {})

def merge_and_build(code, native_name, specific_dict, base_name=None):
    t = {}
    base_dict = BASE_G4.get(base_name, {}) if base_name else {}
    
    for k in ALL_KEYS:
        if k in specific_dict and specific_dict[k]:
            t[k] = specific_dict[k]
        elif k in base_dict and base_dict[k]:
            t[k] = base_dict[k]
        else:
            t[k] = HI.get(k, '')
            
    write_locale(code, native_name, t)

# =============================================================================
# 1. BODO (बड़ो - brx)
# =============================================================================
def build_brx():
    merge_and_build('brx', 'Bodo (बड़ो)', {}, 'generateBodo')

# =============================================================================
# 2. SANTALI (ᱥᱟᱱᱛᱟᱲᱤ - sat)
# =============================================================================
def build_sat():
    merge_and_build('sat', 'Santali (ᱥᱟᱱᱛᱟᱲᱤ)', {}, 'generateSantali')

# =============================================================================
# 3. MANIPURI (মৈতৈলোন - mni)
# =============================================================================
def build_mni():
    merge_and_build('mni', 'Manipuri (মৈতৈলোন)', {}, 'generateManipuri')

if __name__ == '__main__':
    print("=== Generating all 3 Northeast & Tribal locales ===")
    build_brx()
    build_sat()
    build_mni()
    print("✓ All 3 Northeast & Tribal locales successfully generated with 100% key parity!")

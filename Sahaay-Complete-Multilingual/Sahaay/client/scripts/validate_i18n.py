import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Languages to check
LANGUAGES = [
    ('en', 'English'),
    ('hi', 'Hindi (हिन्दी)'),
    ('as', 'Assamese (অসমীয়া)'),
    ('bn', 'Bengali (বাংলা)'),
    ('brx', 'Bodo (बड़ो)'),
    ('doi', 'Dogri (डोगरी)'),
    ('gu', 'Gujarati (ગુજરાતી)'),
    ('kn', 'Kannada (ಕನ್ನಡ)'),
    ('ks', 'Kashmiri (कॉशुर / کٲشُر)'),
    ('kok', 'Konkani (कोंकणी)'),
    ('mai', 'Maithili (मैथिली)'),
    ('ml', 'Malayalam (മലയാളം)'),
    ('mni', 'Manipuri (মৈতৈলোন)'),
    ('mr', 'Marathi (मराठी)'),
    ('ne', 'Nepali (नेपाली)'),
    ('or', 'Odia (ଓଡ଼ିଆ)'),
    ('pa', 'Punjabi (ਪੰਜਾਬੀ)'),
    ('sa', 'Sanskrit (संस्कृतम्)'),
    ('sat', 'Santali (ᱥᱟᱱᱛᱟᱲᱤ)'),
    ('sd', 'Sindhi (سنڌي)'),
    ('ta', 'Tamil (தமிழ்)'),
    ('te', 'Telugu (తెలుగు)'),
    ('ur', 'Urdu (اردو)')
]

def load_locale(code):
    if code == 'en':
        path = os.path.join('src', 'locales', 'en.ts')
    elif code == 'hi':
        path = os.path.join('src', 'locales', 'hi.ts')
    else:
        path = os.path.join('src', 'locales', 'locales', f'{code}.ts')
        
    if not os.path.exists(path):
        raise FileNotFoundError(f"Locale file not found: {path}")
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    res = {}
    pattern = re.compile(r'^\s+([a-zA-Z0-9_]+):\s*(?:\'([^\']*)\'|"([^"]*)"|`([^`]*)`),?', re.MULTILINE)
    for m in pattern.finditer(content):
        k = m.group(1)
        v = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else m.group(4))
        res[k] = v
    return res

print("==================================================")
print("SAHAAY i18n VALIDATION & COMPLETENESS AUDIT")
print("==================================================")

en_dict = load_locale('en')
master_keys = list(en_dict.keys())
total_keys = len(master_keys)

print(f"Master English Keys: {total_keys}")
print(f"Supported Languages: {len(LANGUAGES)}\n")

total_missing = 0
total_empty = 0
incomplete_locales = 0

# Allowed English-identical strings (technical keys, brand names, proper names, IDs)
ALLOWED_IDENTICAL = {
    'appName', 'emblemLetter', 'demoBadge', 'helpline', 'ifscCode', 'tollFree',
    'status_ACTIVE', 'status_COMPLETED', 'status_VERIFIED', 'status_PAID', 
    'status_SANCTIONED', 'status_RESOLVED', 'status_ELIGIBLE', 'status_VERIFICATION',
    'status_IN_PROGRESS', 'status_UNDER_REVIEW', 'status_CURRENT', 'status_PROCESSING',
    'status_ACTION_REQUIRED', 'status_UPCOMING', 'status_PENDING', 'status_REJECTED',
    'status_FAILED', 'status_DEPOSITED_PFMS', 'status_CLAIM_SUBMITTED', 
    'status_DISCREPANCY_FLAGGED', 'status_RESPONSE_ADDED', 'status_AWAITING_HEARING',
    'status_CLOSED', 'status_UNPAID', 'status_PROPOSAL', 'status_NOTIFICATION'
}

for code, name in LANGUAGES:
    loc_dict = load_locale(code)
    loc_keys = list(loc_dict.keys())
    
    missing = [k for k in master_keys if k not in loc_dict]
    empty = [k for k in master_keys if k in loc_dict and not str(loc_dict[k]).strip()]
    
    # Check suspicious English fallback for non-English languages
    suspicious = []
    if code != 'en':
        for k in master_keys:
            if k not in ALLOWED_IDENTICAL and k in loc_dict and loc_dict[k] == en_dict[k] and len(en_dict[k]) > 4:
                suspicious.append((k, loc_dict[k]))
                
    key_count = len(loc_keys)
    status_icon = "✓" if (len(missing) == 0 and len(empty) == 0 and key_count == total_keys) else "✗"
    
    if len(missing) > 0 or len(empty) > 0 or key_count != total_keys:
        incomplete_locales += 1
        total_missing += len(missing)
        total_empty += len(empty)
        print(f"{status_icon} {code:4} {name:25} -> {key_count}/{total_keys} keys | MISSING: {len(missing)} | EMPTY: {len(empty)}")
    else:
        print(f"{status_icon} {code:4} {name:25} -> {key_count}/{total_keys} keys [100% COMPLETE]")

print("\n--------------------------------------------------")
print(f"Total Languages Checked: {len(LANGUAGES)}")
print(f"Total Missing Keys:     {total_missing}")
print(f"Total Empty Values:     {total_empty}")
print(f"Incomplete Locales:     {incomplete_locales}")
print("--------------------------------------------------")

if total_missing == 0 and total_empty == 0 and incomplete_locales == 0:
    print("\nRESULT: PASS (All 23 languages are 100% complete with 0 missing keys)\n")
    sys.exit(0)
else:
    print("\nRESULT: FAIL (Incomplete translations found)\n")
    sys.exit(1)

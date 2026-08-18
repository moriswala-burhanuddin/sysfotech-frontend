import os
import glob
import re

config_code = """export const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:8000/api' : 'https://api.sysfotech.uk/api');
"""
with open('d:/sysfotech-it/frontend/src/config.ts', 'w', encoding='utf-8') as f:
    f.write(config_code)

files = glob.glob('d:/sysfotech-it/frontend/src/**/*.tsx', recursive=True) + glob.glob('d:/sysfotech-it/frontend/src/**/*.ts', recursive=True)

for file in files:
    if file.endswith('config.ts'): continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'http://127.0.0.1:8000/api' in content:
        print(f"Fixing {file}")
        
        # AdminDashboard has a specific constant
        if 'AdminDashboard.tsx' in file:
            content = content.replace("const API_BASE = 'http://127.0.0.1:8000/api';", "import { API_BASE } from '../../config';")
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            continue
            
        if 'AdminLogin.tsx' in file:
            content = content.replace("http://127.0.0.1:8000/api", "${API_BASE}")
            content = content.replace("'${API_BASE}", "`\\${API_BASE}")
            content = content.replace("${API_BASE}/'", "\\${API_BASE}/`")
            if 'import { API_BASE }' not in content:
                content = "import { API_BASE } from '../../config';\n" + content
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            continue
            
        
        # General replacement for others
        depth = file.replace('d:/sysfotech-it/frontend/src/', '').replace('\\', '/').count('/')
        import_path = '../' * depth + 'config'
        if depth == 0: import_path = './config'
        
        content = re.sub(r"'http://127.0.0.1:8000/api([^']*)'", r"`${API_BASE}\1`", content)
        content = re.sub(r"`http://127.0.0.1:8000/api([^`]*)`", r"`${API_BASE}\1`", content)
        content = re.sub(r'"http://127.0.0.1:8000/api([^"]*)"', r"`${API_BASE}\1`", content)
        
        if 'import { API_BASE }' not in content:
            content = f"import {{ API_BASE }} from '{import_path}';\n" + content
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

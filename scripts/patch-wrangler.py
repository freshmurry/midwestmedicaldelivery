#!/usr/bin/env python3
"""Patches the vite-generated dist wrangler.json to include:
  - AI binding  
  - user-routes.js as an additional_modules entry
"""
import json, subprocess, sys

worker_dir = subprocess.check_output(
    "find dist -name 'index.js' -not -path '*/client/*' | head -1 | xargs dirname",
    shell=True, text=True
).strip()

if not worker_dir:
    print("ERROR: Could not find worker dist dir", file=sys.stderr)
    sys.exit(1)

wrangler_path = f"{worker_dir}/wrangler.json"
print(f"Patching {wrangler_path}...")

with open(wrangler_path) as f:
    cfg = json.load(f)

# Ensure AI binding
if 'ai' not in cfg:
    cfg['ai'] = {'binding': 'AI'}

# Remove any existing user-routes entries
cfg['additional_modules'] = [
    m for m in cfg.get('additional_modules', [])
    if 'user-routes' not in m.get('name', '')
]

# CF Workers resolves dynamic import('./user-routes') by stripping ./
# The module name must be "user-routes" (no extension, no ./)
cfg['additional_modules'].append({
    "name": "user-routes",
    "path": "user-routes.js",
    "type": "esm"
})

with open(wrangler_path, 'w') as f:
    json.dump(cfg, f, indent=2)

print("Done. additional_modules:", json.dumps(cfg.get('additional_modules'), indent=2))
print("ai:", json.dumps(cfg.get('ai'), indent=2))

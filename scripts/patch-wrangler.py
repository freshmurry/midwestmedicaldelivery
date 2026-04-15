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

# Add user-routes.js as additional module (idempotent)
existing = [m.get('name') for m in cfg.get('additional_modules', [])]
if 'user-routes.js' not in existing:
    cfg.setdefault('additional_modules', []).append({
        "name": "user-routes.js",
        "path": "user-routes.js",
        "type": "esm"
    })

with open(wrangler_path, 'w') as f:
    json.dump(cfg, f, indent=2)

print("Done. Config:")
print(json.dumps(cfg, indent=2))

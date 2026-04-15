#!/usr/bin/env python3
"""Post-processes the vite-built worker:
1. Uses esbuild to bundle index.js + user-routes.ts together into a single bundle
2. Replaces index.js with the bundled output
3. Disables no_bundle in wrangler.json (since we've already bundled)
4. Ensures AI binding exists
"""
import json, subprocess, sys, os

worker_dir = subprocess.check_output(
    "find dist -name 'index.js' -not -path '*/client/*' | head -1 | xargs dirname",
    shell=True, text=True
).strip()

if not worker_dir:
    print("ERROR: Could not find worker dist dir", file=sys.stderr)
    sys.exit(1)

wrangler_path = f"{worker_dir}/wrangler.json"
index_path = f"{worker_dir}/index.js"

print(f"Worker dir: {worker_dir}")

# Step 1: Bundle worker/index.ts + user-routes inline using esbuild
# We bundle from SOURCE (worker/index.ts) so esbuild resolves ./user-routes statically
result = subprocess.run([
    "bunx", "esbuild", "worker/index.ts",
    "--bundle",
    "--platform=browser",
    "--target=es2022",
    "--format=esm",
    "--external:hono",
    "--external:hono/cors", 
    "--external:hono/logger",
    "--external:cloudflare:workers",
    f"--outfile={index_path}"
], capture_output=True, text=True)

print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
if result.returncode != 0:
    print("ERROR: esbuild failed!", file=sys.stderr)
    sys.exit(1)

print(f"Bundled index.js size: {os.path.getsize(index_path)} bytes")

# Step 2: Patch wrangler.json
with open(wrangler_path) as f:
    cfg = json.load(f)

# Remove no_bundle (we've bundled ourselves)
cfg.pop('no_bundle', None)
cfg.pop('additional_modules', None)

# Ensure AI binding
if 'ai' not in cfg:
    cfg['ai'] = {'binding': 'AI'}

with open(wrangler_path, 'w') as f:
    json.dump(cfg, f, indent=2)

print("Done. wrangler.json key fields:")
print(json.dumps({k: cfg[k] for k in ['main', 'ai'] if k in cfg}, indent=2))
print("no_bundle removed:", 'no_bundle' not in cfg)

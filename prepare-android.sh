#!/usr/bin/env bash
set -euo pipefail
npx cap add android
npx cap sync android
python3 - <<'PY'
from pathlib import Path
p=Path('android/variables.gradle')
s=p.read_text()
s=s.replace('compileSdkVersion = 35','compileSdkVersion = 36')
s=s.replace('targetSdkVersion = 35','targetSdkVersion = 36')
p.write_text(s)
PY

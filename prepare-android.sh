#!/usr/bin/env bash
set -euo pipefail

echo "=== Preparar ficheiros web ==="

mkdir -p www

cp index.html www/
cp sw.js www/
cp manifest.json www/

if [ -f "enviar-push-exemplo.js" ]; then
  cp enviar-push-exemplo.js www/
fi

echo "=== Criar projeto Android ==="

npx cap add android

echo "=== Sincronizar Capacitor ==="

npx cap sync android

echo "=== Configurar API 36 ==="

python3 - <<'PY'
from pathlib import Path

p = Path("android/variables.gradle")

if not p.exists():
    raise SystemExit("android/variables.gradle não encontrado.")

s = p.read_text()

s = s.replace("compileSdkVersion = 35", "compileSdkVersion = 36")
s = s.replace("targetSdkVersion = 35", "targetSdkVersion = 36")

p.write_text(s)

print("API 36 configurada.")
PY

echo "=== Android preparado com sucesso ==="

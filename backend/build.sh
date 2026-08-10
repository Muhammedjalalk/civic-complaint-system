#!/usr/bin/env bash
# Render build script — set this as the Build Command in your Render service settings.
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

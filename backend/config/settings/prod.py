# backend/config/settings/prod.py
from .base import *
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = [o.replace("http://", "https://") for o in CORS_ALLOWED_ORIGINS]

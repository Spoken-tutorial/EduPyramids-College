# backend/config/settings/dev.py
from .base import *
DEBUG = True

INSTALLED_APPS += ["silk"]
MIDDLEWARE = ["silk.middleware.SilkyMiddleware", *MIDDLEWARE]

# SPOKEN_HOST = "https://beta.spoken-tutorial.org"
SPOKEN_HOST = "http://127.0.0.1:8002"
# SPOKEN_MEDIA_HOST = f"{SPOKEN_HOST}/static/media/"
SPOKEN_MEDIA_HOST = f"{SPOKEN_HOST}"
# SPOKEN_MEDIA_HOST = "https://beta.spoken-tutorial.org/static/media/"



# SPOKEN_MEDIA_HOST
HOST = "http://127.0.0.1:8000"

# Debug toolbar settings
# INSTALLED_APPS += ["debug_toolbar"]
# MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware", *MIDDLEWARE]
# INTERNAL_IPS = ["127.0.0.1"]

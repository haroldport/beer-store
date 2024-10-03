import os
import sys
import django
from django.conf import settings

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'beer_store.settings')
django.setup()

if not settings.configured:
    settings.configure(
        DEBUG=True,
        USE_TZ=True,
        DATABASES={"default": {"ENGINE": "django.db.backends.sqlite3"}},
        ROOT_URLCONF="beer_store.urls",
        INSTALLED_APPS=[
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "django.contrib.sites",
            "rest_framework",
            "beer_store.order",
        ],
        SITE_ID=1,
        MIDDLEWARE_CLASSES=(),
    )

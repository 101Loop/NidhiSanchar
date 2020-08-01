import os

import environ

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False),
    USE_SENTRY=(bool, False),
    USE_POSTGRES=(bool, False),
    ALLOWED_HOSTS=(list, []),
    CORS_ORIGIN_WHITELIST=(list, []),
)

# reading .env file
environ.Env.read_env()

# USER SETTINGS
# ------------------------------------------------------------------------------
# https://github.com/101Loop/drf-user
USER_SETTINGS = {
    "DEFAULT_ACTIVE_STATE": True,
    "OTP": {
        "LENGTH": 4,
        "ALLOWED_CHARS": "1234567890",
        "VALIDATION_ATTEMPTS": 6,
        "SUBJECT": "OTP",  # Change as per your need
        "COOLING_PERIOD": 1,  # cooling period in minutes, update as per your need
    },
    "MOBILE_VALIDATION": False,
    "EMAIL_VALIDATION": False,
    "REGISTRATION": {
        "SEND_MAIL": True,
        "MAIL_SUBJECT": "Account Created",  # Change as per your need
        "TEXT_MAIL_BODY": "Your account has been created.",
        "HTML_MAIL_BODY": "Your account has been created.",
    },
}

# SENTRY
# ------------------------------------------------------------------------------
if env("USE_SENTRY"):
    sentry_sdk.init(
        dsn=env("SENTRY_DSN"),
        integrations=[DjangoIntegration()],
        environment=env("SENTRY_ENV"),
    )

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-SECRET_KEY
SECRET_KEY = env("SECRET_KEY")

# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env("DEBUG")

# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# DATABASES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#databases

if env("USE_POSTGRES"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("POSTGRES_DB"),
            "USER": env("POSTGRES_USER"),
            "PASSWORD": env("POSTGRES_PASSWORD"),
            "HOST": env("POSTGRES_HOST"),
            "PORT": env("POSTGRES_PORT"),
        }
    }
else:
    # use sqlite
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
        }
    }

# CORS
# ------------------------------------------------------------------------------
CORS_ALLOW_METHODS = ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"]
CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST")

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = env("EMAIL_BACKEND")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_FROM = env("EMAIL_FROM")
DEFAULT_FROM_EMAIL = EMAIL_FROM  # used in drf-user

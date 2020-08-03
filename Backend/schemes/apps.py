from django.apps import AppConfig


class SchemesConfig(AppConfig):
    name = "schemes"

    def ready(self):
        from .signals import handlers

        pass

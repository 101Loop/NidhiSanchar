from django.apps import AppConfig


class UserprofileConfig(AppConfig):
    name = "userprofile"
    verbose_name = "Userprofile"

    def ready(self):
        from userprofile.signals.handlers import post_registeration

        pass

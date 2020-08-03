from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class DepartmentConfig(AppConfig):
    name = "department"
    verbose_name = _("Department")

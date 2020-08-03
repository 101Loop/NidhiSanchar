from django.contrib import admin

from help.models import Help


@admin.register(Help)
class HelpAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "subject", "date_created")
    readonly_fields = ("date_updated", "date_created")

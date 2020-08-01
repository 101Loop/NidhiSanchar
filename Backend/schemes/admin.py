from django.contrib import admin
from schemes.models import Scheme, FundRequest


@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_by")
    list_filter = ("name",)
    search_fields = ("scheme_code", "name")
    readonly_fields = ["date_created", "date_updated"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(FundRequest)
class FundRequestAdmin(admin.ModelAdmin):
    list_display = ("id", "scheme", "created_by", "status")
    list_filter = ("status", "scheme", "created_by")
    search_fields = ("scheme__name",)
    readonly_fields = ["date_created", "date_updated"]

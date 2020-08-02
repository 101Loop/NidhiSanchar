from django.contrib import admin

from discussions.models import (
    RequestDiscussion,
    Message,
    SchemeDiscussion,
    SchemeMessage,
)


@admin.register(RequestDiscussion)
class RequestDiscussion(admin.ModelAdmin):
    list_display = ("id", "request", "is_active")
    readonly_fields = ("date_created", "date_updated")
    exclude = ("created_by",)

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Message)
class Message(admin.ModelAdmin):
    readonly_fields = ("date_created", "date_updated")


@admin.register(SchemeDiscussion)
class SchemeDiscussionAdmin(admin.ModelAdmin):
    list_display = ("id", "parent_scheme", "is_active")
    readonly_fields = ("date_created", "date_updated")
    exclude = ("created_by",)

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(SchemeMessage)
class SchemeMessageAdmin(admin.ModelAdmin):
    readonly_fields = ("date_created", "date_updated")

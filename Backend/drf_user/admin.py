"""
All Admin configuration related to drf_user

Author: Himanshu Shankar (https://himanshus.com)
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, GroupAdmin, Group
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.utils.text import gettext_lazy as _

from .models import User, Role, AuthTransaction, OTPValidation


class DRFUserAdmin(UserAdmin):
    """
    Overrides UserAdmin to show fields name & mobile and remove fields:
    first_name, last_name

    Author: Himanshu Shankar (https://himanshus.com)
    """

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("name", "email", "mobile",)},),
        (
            _("Permissions"),
            {"fields": ("is_active", "is_staff", "is_superuser", "groups")},
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", "email", "mobile"),
            },
        ),
    )
    filter_horizontal = ("groups", "user_permissions")
    list_display = (
        "username",
        "email",
        "name",
        "mobile",
        "is_staff",
        "roles",
        "get_user_profile",
    )
    list_filter = (
        "username",
        "is_staff",
        "is_active",
        "is_superuser",
    )
    search_fields = ("username", "name", "email", "mobile")
    readonly_fields = ("date_joined", "last_login", "update_date")

    def roles(self, obj):
        """
        Source; https://stackoverflow.com/questions/2857001/adding-links-to-full-change-forms-for-inline-items-in-django-admin
        """
        from urllib.parse import urlencode

        qs = obj.groups.all()
        count = qs.count()
        if count > 1:
            filter_dict = {"user__id__exact": obj.id}
            return mark_safe(
                "<a href={}?{}>List {} Roles</a>".format(
                    reverse("admin:drf_user_role_changelist"),
                    urlencode(filter_dict),
                    count,
                )
            )
        elif count == 1:
            return mark_safe(
                "<a href={}>Open {}</a>".format(
                    reverse("admin:drf_user_role_change", args=(qs[0].id,)), str(qs[0])
                )
            )
        else:
            return "0"

    roles.short_description = "Roles"

    def get_user_profile(self, obj):
        try:
            userprofile = obj.userprofile
        except obj._meta.model.userprofile.RelatedObjectDoesNotExist as err:
            return "No Profile"
        else:
            return mark_safe(
                "<a href={}>{}</a>".format(
                    reverse(
                        "admin:userprofile_userprofile_change", args=(userprofile.id,)
                    ),
                    str(userprofile),
                )
            )

    get_user_profile.short_description = "User Profile"


@admin.register(AuthTransaction)
class AuthTransactionAdmin(admin.ModelAdmin):
    """
    Author: Nitesh Rawat(https://github.com/niteshrawat1995)
    Company: Civil Machines Technologies Private Limited
    Contact: info@civilmachines.com
    """

    list_display = ("id", "created_by", "ip_address", "create_date", "is_active")
    list_filter = ("created_by", "create_date", "is_active")
    search_fields = ("created_by__username",)
    readonly_fields = (
        "created_by",
        "create_date",
        "update_date",
        "ip_address",
        "token",
        "session",
    )

    fieldsets = (
        ("User", {"fields": ("created_by",)}),
        (None, {"fields": ("create_date", "ip_address")}),
        ("Authorization Details", {"fields": ("token", "session")}),
        ("Status", {"fields": ("is_active",)}),
    )

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


class OTPValidationAdmin(admin.ModelAdmin):
    list_display = ("destination", "otp", "prop")


# UnRegister default Group & register proxy model Role
# This will also remove additional display of application in admin panel.
# Source: https://stackoverflow.com/a/32445368
admin.site.unregister(Group)
admin.site.register(Role, GroupAdmin)

admin.site.register(User, DRFUserAdmin)
admin.site.register(OTPValidation, OTPValidationAdmin)

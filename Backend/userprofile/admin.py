from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """
    User Profile Admin
    """

    list_display = ("id", "created_by", "dob", "gender", "date_updated", "date_created")
    search_fields = ("created_by",)
    readonly_fields = ("created_by", "is_centre_user", "is_state_user", "dept_name")

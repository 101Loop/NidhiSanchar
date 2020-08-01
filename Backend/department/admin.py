from django.contrib import admin

from department.models import StateDepartment, CentreDepartment, DepartmentName


@admin.register(DepartmentName)
class DepartmentName(admin.ModelAdmin):
    list_display = ("id", "name", "date_created")
    readonly_fields = ["date_created", "date_updated"]


@admin.register(CentreDepartment)
class CentreDepartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "dept_name", "dept_poc")
    search_fields = ("dept_name",)
    readonly_fields = ["date_created", "date_updated"]


@admin.register(StateDepartment)
class StateDepartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "dept_name", "dept_poc", "state")
    list_filter = ("state",)
    search_fields = ("dept_name",)
    readonly_fields = ["date_created", "date_updated"]

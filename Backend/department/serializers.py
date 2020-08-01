from rest_framework import serializers

from .models import CentreDepartment, StateDepartment


class CentreDepartmentSerializer(serializers.ModelSerializer):
    """
    CentreDepartmentSerializer is a model serializer which includes
    the attributes of CentreDepartment Model.
    """

    user_id = serializers.CharField(source="dept_poc.id", read_only=True)
    username = serializers.CharField(source="dept_poc.username", read_only=True)
    name = serializers.CharField(source="dept_poc.name", read_only=True)
    email = serializers.CharField(source="dept_poc.email", read_only=True)
    mobile = serializers.CharField(source="dept_poc.mobile", read_only=True)

    class Meta:
        model = CentreDepartment
        fields = (
            "id",
            "dept_name",
            "about",
            "user_id",
            "username",
            "name",
            "email",
            "mobile",
            "date_created",
            "date_updated",
        )
        read_only_fields = (
            "id",
            "dept_id",
            "dept_name",
            "about",
            "date_created",
            "date_updated",
        )


class StateDepartmentSerializer(serializers.ModelSerializer):
    """
    StateDepartmentSerializer is a model serializer which includes
    the attributes of StateDepartment Model.
    """

    user_id = serializers.CharField(source="poc.id", read_only=True)
    username = serializers.CharField(source="poc.username", read_only=True)
    name = serializers.CharField(source="poc.name", read_only=True)
    email = serializers.CharField(source="poc.email", read_only=True)
    mobile = serializers.CharField(source="poc.mobile", read_only=True)

    class Meta:
        model = StateDepartment
        fields = (
            "id",
            "dept_name",
            "about",
            "state",
            "user_id",
            "username",
            "name",
            "email",
            "mobile",
            "date_created",
            "date_updated",
        )
        read_only_fields = (
            "id",
            "dept_id",
            "dept_name",
            "about",
            "state",
            "date_created",
            "date_updated",
        )
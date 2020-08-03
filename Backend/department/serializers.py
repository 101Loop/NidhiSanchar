from rest_framework import serializers

from .models import CentreDepartment, StateDepartment, DepartmentName


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
            "total_schemes_created",
            "total_fund_requests",
            "total_scheme_discussions",
            "total_requests_processed",
            "date_created",
            "date_updated",
        )
        read_only_fields = (
            "id",
            "dept_id",
            "dept_name",
            "about",
            "total_schemes_created",
            "total_fund_requests",
            "total_scheme_discussions",
            "total_requests_processed",
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
            "total_fund_requests_created",
            "total_request_processed",
            "total_requests_pending",
            "total_scheme_discussions",
            "date_created",
            "date_updated",
        )
        read_only_fields = (
            "id",
            "dept_id",
            "dept_name",
            "about",
            "state",
            "total_fund_requests_created",
            "total_request_processed",
            "total_requests_pending",
            "total_scheme_discussions",
            "date_created",
            "date_updated",
        )


class DepartmentSerializer(serializers.ModelSerializer):
    """
    This will help to show the stats on landing page
    """

    class Meta:
        model = DepartmentName
        fields = (
            "total_schemes",
            "total_requests",
            "total_discussions",
            "pending_requests",
        )

        read_only_fields = (
            "total_schemes",
            "total_requests",
            "total_discussions",
            "pending_requests",
        )

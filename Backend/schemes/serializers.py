from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from department.models import StateDepartment
from department.serializers import CentreDepartmentSerializer, StateDepartmentSerializer
from .models import Scheme, FundRequest, SchemeFundRequest


class SchemeSerializer(serializers.ModelSerializer):
    """
    Scheme Serializer
    """

    created_by = CentreDepartmentSerializer(many=False, read_only=True)

    class Meta:
        model = Scheme
        fields = (
            "id",
            "name",
            "date_of_launching",
            "description",
            "slug",
            "scheme_budget",
            "is_active",
            "created_by",
            "date_created",
            "date_updated",
        )
        read_only_fields = ["date_created", "date_updated"]


class FundRequestSerializer(serializers.ModelSerializer):
    """
    Fund Request Serializer
    """

    class Meta:
        model = FundRequest
        fields = (
            "id",
            "scheme",
            "description",
            "document",
            "amount",
            "status",
            "created_by",
            "date_created",
            "date_updated",
        )
        read_only_fields = ["date_created", "date_updated"]
        depth = 1


class FundRequestCreateSerializer(serializers.ModelSerializer):
    """
    Fund Request Serializer
    """

    created_by = StateDepartmentSerializer(many=False, read_only=True)

    def validate(self, attrs):
        user = self.context["request"].user
        try:
            dept = StateDepartment.objects.get(dept_poc=user)
        except StateDepartment.DoesNotExist:
            raise ValidationError(_("You are not authorised to perform this action."))
        else:
            try:
                FundRequest.objects.get(scheme=attrs["scheme"], created_by=dept)
            except FundRequest.DoesNotExist:
                pass
            else:
                raise ValidationError(
                    _(
                        f"Fund request for the scheme {attrs['scheme']} is already created by you."
                    )
                )

        return attrs

    class Meta:
        model = FundRequest
        fields = (
            "id",
            "scheme",
            "description",
            "document",
            "amount",
            "status",
            "created_by",
            "date_created",
            "date_updated",
        )
        read_only_fields = ["date_created", "date_updated"]


class FundRequestUpdateSerializer(serializers.ModelSerializer):
    """
    Fund Request Serializer
    """

    created_by = StateDepartmentSerializer(many=False, read_only=True)

    class Meta:
        model = FundRequest
        fields = (
            "id",
            "scheme",
            "description",
            "document",
            "amount",
            "status",
            "created_by",
            "date_created",
            "date_updated",
        )
        read_only_fields = ["date_created", "date_updated"]


class SchemeFundRequestSerializer(serializers.ModelSerializer):
    """
    Serializer SchemeFundRequest
    """

    class Meta:
        model = SchemeFundRequest
        fields = (
            "created_by",
            "name",
            "date_of_launching",
            "description",
            "document",
            "funds_required",
            "status",
            "comments",
            "date_created",
            "date_updated",
        )

        read_only_fields = ("date_updated", "date_created")

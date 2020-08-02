from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from department.permissions import is_centre_user, is_state_user
from schemes.serializers import FundRequestSerializer, SchemeSerializer
from .models import RequestDiscussion, Message, SchemeDiscussion, SchemeMessage

User = get_user_model()


class DiscussionSerializer(serializers.ModelSerializer):
    """For Serializing Request Discussion"""

    request = FundRequestSerializer(read_only=True)
    created_by = serializers.SlugRelatedField(
        many=False,
        slug_field="username",
        queryset=User.objects.all(),
        allow_null=True,
        default=None,
    )

    # Get the current user from request context
    def validate_created_by(self, value):
        user = self.context["request"].user
        if is_centre_user(user) or is_state_user(user):
            return user
        raise ValidationError("You are not authorized to perform this action")

    class Meta:
        model = RequestDiscussion
        fields = [
            "id",
            "request",
            "is_active",
            "created_by",
            "date_created",
            "date_updated",
        ]


class MessageSerializer(serializers.ModelSerializer):
    """For Serializing Request Message"""

    sender = serializers.SlugRelatedField(
        many=False,
        slug_field="username",
        queryset=User.objects.all(),
        allow_null=True,
        default=None,
    )
    scheme_name = serializers.CharField(
        source="parent_scheme.scheme_name", read_only=True, allow_null=True
    )

    # Get the current user from request context
    def validate_sender(self, value):
        """
        Only State/Center User can send message
        Parameters
        ----------
        value
        Returns
        -------
        user
        """
        user = self.context["request"].user
        if is_centre_user(user) or is_state_user(user):
            return user
        raise ValidationError("You are not authorized to perform this action")

    class Meta:
        model = Message
        fields = [
            "id",
            "sender",
            "message",
            "document",
            "date_created",
            "date_updated",
            "scheme_name",
        ]


class SchemeDiscussionSerializer(serializers.ModelSerializer):
    """For Serializing Scheme Discussion"""

    scheme = SchemeSerializer(read_only=True)
    created_by = serializers.SlugRelatedField(
        many=False,
        slug_field="username",
        queryset=User.objects.all(),
        allow_null=True,
        default=None,
    )
    scheme_name = serializers.CharField(source="parent_scheme.name", read_only=True)

    # Get the current user from request context
    def validate_created_by(self, value):
        user = self.context["request"].user
        if is_centre_user(user) or is_state_user(user):
            return user
        raise ValidationError("You are not authorized to perform this action")

    class Meta:
        model = SchemeDiscussion
        fields = [
            "id",
            "scheme",
            "scheme_name",
            "is_active",
            "created_by",
            "date_created",
            "date_updated",
        ]


class SchemeMessageSerializer(serializers.ModelSerializer):
    """For Serializing Scheme Message"""

    sender = serializers.SlugRelatedField(
        many=False,
        slug_field="username",
        queryset=User.objects.all(),
        allow_null=True,
        default=None,
    )
    scheme_name = serializers.CharField(
        source="parent_scheme.scheme_name", read_only=True, allow_null=True
    )

    # Get the current user from request context
    def validate_sender(self, value):
        """
        Only State/Center User can send message
        Parameters
        ----------
        value
        Returns
        -------
        user
        """
        user = self.context["request"].user
        if is_centre_user(user) or is_state_user(user):
            return user
        raise ValidationError("You are not authorized to perform this action")

    class Meta:
        model = SchemeMessage
        fields = [
            "id",
            "sender",
            "message",
            "document",
            "date_created",
            "date_updated",
            "scheme_name",
        ]

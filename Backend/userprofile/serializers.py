from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):
    """
    UserProfileSerializer is a model serializer that includes the attributes of the user profile.
    """

    class Meta:
        from .models import UserProfile

        model = UserProfile
        fields = (
            "dob",
            "gender",
            "date_updated",
            "date_created",
        )
        read_only_fields = (
            "id",
            "is_state_user",
            "is_centre_user",
            "dept_name",
            "date_created",
            "date_updated",
        )


class UserImageSerializer(serializers.ModelSerializer):
    """
    User Image Serializer
    ---------------------
    """

    class Meta:
        from .models import UserProfile

        model = UserProfile
        fields = ("id", "picture")

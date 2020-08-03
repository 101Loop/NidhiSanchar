from rest_framework import serializers

from .models import Help


class HelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help
        fields = (
            "email",
            "subject",
            "text",
            "document",
            "date_created",
            "date_updated",
        )

        read_only_fields = ("date_updated", "date_created")

import os

from django.core.exceptions import ValidationError


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx"]
    if not ext in valid_extensions:
        raise ValidationError(u"File not supported!")

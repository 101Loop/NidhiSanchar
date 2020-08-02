import os

from django.core.exceptions import ValidationError


def validate_file_extension(value):
    """
    Validates file extension of the uploaded file
    """
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx"]
    if not ext in valid_extensions:
        raise ValidationError(u"File not supported!")


def file_size(value):
    """
    Validates the file size of the uploaded file
    """
    limit = 10 * 1024 * 1024
    if value.size > limit:
        raise ValidationError("File too large. Size should not exceed 10 MiB.")

from django.db import models

from schemes.validators import validate_file_extension, file_size
from userprofile.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _


class Help(TimeStampedModel):
    """
    Base model for all help requests
    """

    email = models.EmailField(verbose_name=_("Email"))
    subject = models.CharField(verbose_name=_("Subject"), max_length=500)
    text = models.TextField(verbose_name=_("Description"))
    document = models.FileField(
        verbose_name=_("Document"),
        upload_to="proposals/",
        validators=[validate_file_extension, file_size],
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("Help")
        verbose_name_plural = _("Help")

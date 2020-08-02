from django.conf import settings
from django.db import models
from django.utils.text import gettext_lazy as _

from userprofile.models import TimeStampedModel
from schemes.models import Scheme, FundRequest
from schemes.validators import validate_file_extension, file_size


class RequestDiscussion(TimeStampedModel):
    """
    Parent Discussion Model
    """

    request = models.OneToOneField(to=FundRequest, on_delete=models.PROTECT)
    is_active = models.BooleanField(_("Is Discussion Active?"), default=True)
    created_by = models.ForeignKey(
        verbose_name=_("Discussion Started By"),
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return self.request.scheme.name + "|" + self.request.created_by.dept_name.name

    @property
    def scheme_name(self):
        return self.request.scheme.name

    class Meta:
        ordering = ["date_created"]
        verbose_name = _("Request Discussion")
        verbose_name_plural = _("Request Discussions")


class Message(TimeStampedModel):
    """
    Scheme Messages Model
    """

    discussion = models.ForeignKey(
        to=RequestDiscussion, related_name="parent_discussion", on_delete=models.PROTECT
    )
    sender = models.ForeignKey(
        to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="sender",
    )
    message = models.TextField()
    document = models.FileField(
        verbose_name=_("Document"),
        upload_to="proposals/",
        validators=[validate_file_extension, file_size],
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.discussion.scheme_name}'s Related Messages"

    class Meta:
        ordering = ["date_created"]
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")


class SchemeDiscussion(TimeStampedModel):
    """
    Parent Scheme Discussion Model
    """

    parent_scheme = models.OneToOneField(to=Scheme, on_delete=models.PROTECT)
    is_active = models.BooleanField(_("Is Discussion Active?"), default=True)
    created_by = models.ForeignKey(
        verbose_name=_("Discussion Started By"),
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return (
            self.parent_scheme.name + "|" + self.parent_scheme.created_by.dept_name.name
        )

    @property
    def scheme_name(self):
        return self.parent_scheme.name

    class Meta:
        ordering = ["date_created"]
        verbose_name = _("Scheme Discussion")
        verbose_name_plural = _("Scheme Discussions")


class SchemeMessage(TimeStampedModel):
    """
    Scheme Messages Model
    """

    scheme_discussion = models.ForeignKey(
        to=SchemeDiscussion, related_name="scheme_discussion", on_delete=models.PROTECT
    )
    sender = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="message_sender",
    )
    message = models.TextField()
    document = models.FileField(
        verbose_name=_("Document"),
        upload_to="proposals/",
        validators=[validate_file_extension, file_size],
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.scheme_discussion.scheme_name}'s Related Messages"

    class Meta:
        ordering = ["date_created"]
        verbose_name = _("Scheme Message")
        verbose_name_plural = _("Scheme Messages")

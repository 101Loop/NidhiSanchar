from django.conf import settings
from django.db import models
from django.utils.text import gettext_lazy as _


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-
    updating ``created`` and ``modified`` fields
    """

    date_created = models.DateTimeField(
        verbose_name=_("Date Created"), auto_now_add=True
    )
    date_updated = models.DateTimeField(verbose_name=_("Date Modified"), auto_now=True)

    class Meta:
        abstract = True


class UserProfile(TimeStampedModel):
    """
    Additional User Information.
    A user can have some additional information.
    It contains following fields:
        1. created_by: It specifies the user.
        2. dob: Date of birth of the user.
        3. gender: Gender of the user.
        4. picture: Picture of the user.
        5. date_created: It shows the date on which the profile is created.
        5. date_updated: It shows the date on which the profile is updated.
    """

    GENDER_CHOICES = (("M", "MALE"), ("F", "FEMALE"), ("O", "OTHERS"))

    created_by = models.OneToOneField(
        to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT, verbose_name=_("User")
    )
    dob = models.DateField(verbose_name=_("Date of Birth"), null=True, blank=True)
    gender = models.CharField(
        verbose_name=_("Gender"), max_length=5, choices=GENDER_CHOICES, default="O"
    )
    picture = models.ImageField(
        verbose_name=_("Profile Image"), null=True, blank=True, upload_to="users/"
    )

    def __str__(self) -> str:
        return self.created_by.name

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

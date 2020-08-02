from django.core.validators import MinValueValidator
from django.db import models
from django.utils.text import gettext_lazy as _, slugify
from schemes.validators import validate_file_extension, file_size

from department.models import CentreDepartment, StateDepartment
from userprofile.models import TimeStampedModel


class Scheme(TimeStampedModel):
    """
    Model to represent Schemes
    Notes
    -----
    - Scheme's can only be created by centre-departments
    """

    created_by = models.ForeignKey(
        help_text=_("Which Department Created this Scheme"),
        verbose_name=_("Scheme Created By"),
        to=CentreDepartment,
        on_delete=models.PROTECT,
    )
    name = models.CharField(
        help_text=_("Name of the Scheme"), verbose_name=_("Scheme Name"), max_length=255
    )
    date_of_launching = models.DateField(
        help_text=_("When the scheme will be launched"),
        verbose_name=_("Date of Launching"),
    )
    description = models.TextField(verbose_name=_("Scheme Description"))
    slug = models.SlugField(
        help_text=_("To create unique urls for the schemes"),
        max_length=100,
        unique=True,
        null=True,
        blank=True,
    )
    scheme_budget = models.DecimalField(
        verbose_name=_("Total Budget of the Scheme(in cr.)"),
        max_digits=25,
        decimal_places=2,
        validators=[MinValueValidator(0.00)],
    )
    is_active = models.BooleanField(_("Is Scheme Active?"), default=True)

    def __str__(self) -> str:
        return str(self.name) + " | " + str(self.created_by.dept_name.name)

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.slug = slugify(self.name)

        super(Scheme, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _("Scheme")
        verbose_name_plural = _("Schemes")


class FundRequest(TimeStampedModel):
    """
    Fund Request Model
    """

    NEW = "N"
    IN_PROCESS = "IP"
    DISBURSED = "D"
    REJECTED = "R"
    REQUEST_STATUS = [
        (NEW, "New"),
        (IN_PROCESS, "In Process"),
        (REJECTED, "Rejected"),
        (DISBURSED, "Disbursed"),
    ]

    scheme = models.ForeignKey(
        verbose_name=_("Scheme"), to=Scheme, on_delete=models.PROTECT
    )
    description = models.TextField(verbose_name=_("Proposal Brief"))
    document = models.FileField(
        verbose_name=_("Proposal Document"),
        upload_to="proposals/",
        validators=[validate_file_extension, file_size],
        blank=True,
        null=True,
    )
    amount = models.DecimalField(
        verbose_name=_("Total Funds Required(in cr.)"),
        max_digits=25,
        decimal_places=2,
        validators=[MinValueValidator(0.00)],
    )
    status = models.CharField(
        verbose_name=_("Status of the Request"),
        choices=REQUEST_STATUS,
        default=NEW,
        max_length=15,
        blank=True,
        null=True,
    )
    created_by = models.ForeignKey(
        verbose_name=_("Requested By"), to=StateDepartment, on_delete=models.PROTECT
    )

    def __str__(self):
        return self.scheme.name + "|" + self.created_by.dept_name.name

    class Meta:
        verbose_name = _("Fund Request")
        verbose_name_plural = _("Fund Requests")
        unique_together = ["scheme", "created_by"]

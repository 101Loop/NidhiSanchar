from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import gettext_lazy as _
from localflavor.in_.in_states import STATE_CHOICES

from userprofile.models import TimeStampedModel


class DepartmentName(TimeStampedModel):
    """
    Department Name Model
    ---------------------

    Fields:
    - name: Name of the department
    - date_created: When object was created
    - date_updated: When object was last updated
    """

    name = models.CharField(
        help_text=_("Name of the Department"),
        verbose_name=_("Department Name"),
        max_length=255,
        blank=False,
        null=False,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Department Name")
        verbose_name_plural = _("Department Names")


class CentreDepartment(TimeStampedModel):
    """
    Model to Represent Departments of Centre
    ----------------------------------------

    Fields:
    - dept_name: Name of the department
    - about: Description of the department
    - dept_poc: Point of Contact for the Department
    - date_created: When object was created
    - date_updated: When object was last updated
    """

    dept_name = models.ForeignKey(
        help_text=_("Name of the Department"),
        verbose_name=_("Department Name"),
        to=DepartmentName,
        on_delete=models.PROTECT,
    )
    about = models.TextField(
        help_text=_("Description of the Department"), null=True, blank=True
    )
    dept_poc = models.OneToOneField(
        verbose_name=_("Point of Contact"),
        help_text=_("Point of Contact from the Department"),
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"Center - {self.dept_name.name} Department"

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)
        try:
            state_user = StateDepartment.objects.get(dept_poc=self.dept_poc)
        except StateDepartment.DoesNotExist:
            pass
        else:
            raise ValidationError(
                {
                    "dept_poc": ValidationError(
                        _(f"{self.dept_poc} is already a POC in State Department."),
                        code="invalid",
                    ),
                }
            )

    @property
    def total_schemes_created(self):
        return self.scheme_set.count()

    @property
    def total_fund_requests(self):
        from schemes.models import FundRequest

        fund_request = FundRequest.objects.filter(
            scheme__created_by__dept_name=self.dept_name
        ).count()
        return fund_request

    @property
    def total_scheme_discussions(self):
        from discussions.models import SchemeDiscussion

        scheme_discussion = SchemeDiscussion.objects.filter(
            parent_scheme__created_by__dept_name=self.dept_name
        ).count()
        return scheme_discussion

    @property
    def total_requests_processed(self):
        from schemes.models import FundRequest

        requests = FundRequest.objects.filter(
            scheme__created_by__dept_name=self.dept_name
        )
        total_requests = requests.exclude(status="N").count()
        return total_requests

    class Meta:
        verbose_name = _("Centre Department")
        verbose_name_plural = _("Centre Departments")


class StateDepartment(TimeStampedModel):
    """
    Model to Represent State Departments
    ------------------------------------

    Fields:
    - state: State of the Department
    - dept_name: Name of the department
    - about: Description of the department
    - dept_poc: Point of Contact for the Department
    - date_created: When object was created
    - date_updated: When object was last updated
    """

    state = models.CharField(choices=STATE_CHOICES, max_length=25)
    dept_name = models.ForeignKey(
        help_text=_("Name of the Department"),
        verbose_name=_("Department Name"),
        to=DepartmentName,
        on_delete=models.PROTECT,
    )
    about = models.TextField(
        help_text=_("Description of the Department"), null=True, blank=True
    )
    dept_poc = models.OneToOneField(
        verbose_name=_("Point of Contact"),
        help_text=_("Point of Contact from the Department"),
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{str(self.state)} - {self.dept_name.name} Department"

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)
        try:
            centre_user = CentreDepartment.objects.get(dept_poc=self.dept_poc)
        except CentreDepartment.DoesNotExist:
            pass
        else:
            raise ValidationError(
                {
                    "dept_poc": ValidationError(
                        _(f"{self.dept_poc} is already a POC in Centre Department."),
                        code="invalid",
                    ),
                }
            )

    @property
    def total_fund_requests_created(self):
        from schemes.models import FundRequest

        request = FundRequest.objects.filter(created_by=self).count()
        return request

    @property
    def total_request_processed(self):
        from schemes.models import FundRequest

        total_request = FundRequest.objects.filter(created_by=self)
        processed = total_request.filter(status__in=["D", "R"]).count()
        return processed

    @property
    def total_requests_pending(self):
        from schemes.models import FundRequest

        total_request = FundRequest.objects.filter(created_by=self)
        pending = total_request.filter(status__in=["N", "IP"]).count()
        return pending

    @property
    def total_scheme_discussions(self):
        from discussions.models import SchemeDiscussion

        scheme_discussion = SchemeDiscussion.objects.filter(
            parent_scheme__created_by__dept_name=self.dept_name
        ).count()
        return scheme_discussion

    class Meta:
        verbose_name = _("State Department")
        verbose_name_plural = _("State Departments")
        unique_together = (("dept_name", "state"),)

from django.utils.text import gettext_lazy as _
from rest_framework import generics
from rest_framework.exceptions import ValidationError, NotFound

from department.models import CentreDepartment, StateDepartment
from department.permissions import is_centre_user, is_state_user
from .models import Scheme, FundRequest, SchemeFundRequest
from .serializers import (
    SchemeSerializer,
    FundRequestSerializer,
    FundRequestCreateSerializer,
    FundRequestUpdateSerializer,
    SchemeFundRequestSerializer,
)


class SchemeListView(generics.ListAPIView):
    """
    Scheme List View
    ----------------
    - Lists all the available schemes in the system
    """

    serializer_class = SchemeSerializer

    def get_queryset(self):
        user = self.request.user
        # if user is from center
        try:
            centre_dept = CentreDepartment.objects.get(dept_poc=user)
        except CentreDepartment.DoesNotExist:
            pass
        else:
            if is_centre_user(user):
                qs = Scheme.objects.filter(created_by=centre_dept)
                if qs:
                    return qs
                else:
                    raise NotFound(_("Schemes Does Not Exists Yet."))

        # if user is from state
        try:
            state_dept = StateDepartment.objects.get(dept_poc=user)
        except StateDepartment.DoesNotExist:
            pass
        else:
            if is_state_user(user):
                dept_name = state_dept.dept_name
                qs = Scheme.objects.filter(created_by__dept_name=dept_name)
                if qs:
                    return qs
                else:
                    raise NotFound(_("Schemes Does Not Exists Yet."))

        # else a user can see all schemes
        qs = Scheme.objects.all()
        if qs:
            return qs
        else:
            raise NotFound(_("Schemes Does not Exist Yet."))


class SchemeCreateView(generics.CreateAPIView):
    """
    Scheme Create View
    ------------------
    - This view lets an user create Scheme
    - The User should belong to Centre Department otherwise raises 404
    """

    serializer_class = SchemeSerializer
    queryset = Scheme.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        try:
            dept = CentreDepartment.objects.get(dept_poc=user)
        except CentreDepartment.DoesNotExist:
            raise ValidationError("You are not authorized to perform this action")

        if is_centre_user(user):
            serializer.save(created_by=dept)
        else:
            raise ValidationError("You are not authorized to perform this action")


class SchemeRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    Scheme Retrieve Update View
    ---------------------------
    - get: Retrieves a single scheme using the slug of the scheme
    - put/patch: Updates the scheme object, the user should be creator of the scheme
    """

    serializer_class = SchemeSerializer
    queryset = Scheme.objects.all()
    lookup_field = "slug"

    def perform_update(self, serializer):
        """
        - Before updating object, will check the owner of the object
        - If not owner of the object, then raises NotFound
        Parameters
        ----------
        serializer
        Returns
        -------
        """
        super(SchemeRetrieveUpdateView, self).perform_update(serializer=serializer)
        scheme_slug = self.kwargs["slug"]
        user = self.request.user
        try:
            user_dept = CentreDepartment.objects.get(dept_poc=user)
            scheme = Scheme.objects.get(slug=scheme_slug)
        except CentreDepartment.DoesNotExist:
            raise NotFound("Department Does not exist.")
        except Scheme.DoesNotExist:
            raise NotFound("Message Does not exist")
        else:
            if not scheme.created_by == user_dept:
                raise ValidationError(
                    "You can only update the schemes that was created by you."
                )
            serializer.save()


class FundRequestListView(generics.ListAPIView):
    """
    Fund Request List View
    -----------------------------
    - get: If user is from centre, it lists all requests
    - get: If user is from state, it will only lists the requests created by user
    """

    serializer_class = FundRequestSerializer
    queryset = FundRequest.objects.all()

    def get_queryset(self):
        user = self.request.user
        if is_centre_user(user):
            dept = CentreDepartment.objects.get(dept_poc=user)
            qs = FundRequest.objects.filter(scheme__created_by=dept)
            return qs
        elif is_state_user(user):
            dept = StateDepartment.objects.get(dept_poc=user)
            qs = FundRequest.objects.filter(created_by=dept)
            return qs
        else:
            raise ValidationError(_("You are not authorized to perform this action."))


class FundRequestCreateAPIView(generics.CreateAPIView):
    """
    Fund Request Create View
    ------------------------
    - This view creates a fund request against a scheme, only state user can create fund request
    """

    queryset = FundRequest.objects.all()
    serializer_class = FundRequestCreateSerializer

    def perform_create(self, serializer):
        user = self.request.user

        if is_state_user(user):
            try:
                dept = StateDepartment.objects.get(dept_poc=user)
            except StateDepartment.DoesNotExist:
                raise ValidationError("You are not authorized to perform this action.")
            else:
                serializer.save(created_by=dept)
        else:
            raise ValidationError("You are not authorized to perform this action.")


class FundRequestRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    """
    Fund Request Retrieve Update View
    ---------------------------------
    - get: Retrieves fund request on the basis of ID
    - put/patch: Updates the fund request object
    """

    serializer_class = FundRequestUpdateSerializer
    queryset = FundRequest.objects.all()
    lookup_field = "pk"

    def perform_update(self, serializer):
        user = self.request.user
        if not is_centre_user(user) or is_state_user(user):
            raise ValidationError(_("You are not authorized to perform this action."))
        serializer.save()


class FundRequestPerSchemeListView(generics.ListAPIView):
    """
    Fund Requests Per Scheme List View
    """

    serializer_class = FundRequestSerializer
    queryset = FundRequest.objects.all()
    lookup_field = "scheme_id"

    def filter_queryset(self, queryset):
        """
        This will filter the queryset to return all fund requests with the given scheme id.
        Parameters
        ----------
        queryset
        Returns
        -------
        queryset
        """

        scheme_id = self.kwargs.pop("scheme_id")
        qs = super(FundRequestPerSchemeListView, self).filter_queryset(
            queryset=queryset
        )
        try:
            scheme = Scheme.objects.get(pk=scheme_id)
        except Scheme.DoesNotExist:
            raise NotFound(
                _(f"Requests with {scheme_id} does not exists. Please create one.")
            )
        else:
            self.check_object_permissions(request=self.request, obj=scheme)
            return qs.filter(scheme=scheme)


class SchemeFundRequestByStateAPIView(generics.CreateAPIView):
    """
    Scheme Fund Request By State API View
    """

    serializer_class = SchemeFundRequestSerializer
    queryset = SchemeFundRequest.objects.all()

    def perform_create(self, serializer):
        user = self.request.user

        if is_state_user(user):
            try:
                dept = StateDepartment.objects.get(dept_poc=user)
            except StateDepartment.DoesNotExist:
                raise ValidationError("You are not authorized to perform this action.")
            else:
                serializer.save(created_by=dept)
        else:
            raise ValidationError("You are not authorized to perform this action.")

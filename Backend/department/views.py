from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView

from .models import CentreDepartment, StateDepartment
from .serializers import CentreDepartmentSerializer, StateDepartmentSerializer


class CentreDepartmentView(ListAPIView):
    """
    Centre Department View
    ----------------------
    This view returns the related department of the user
    """

    serializer_class = CentreDepartmentSerializer

    def get_queryset(self):
        user = self.request.user
        qs = CentreDepartment.objects.filter(dept_poc=user)
        if qs:
            return qs
        else:
            raise ValidationError("You are not authorized to view this page.")


class StateDepartmentView(ListAPIView):
    """
    State Department View
    ----------------------
    This view returns the related departments of the user
    """

    serializer_class = StateDepartmentSerializer

    def get_queryset(self):
        user = self.request.user
        qs = StateDepartment.objects.filter(dept_poc=user)
        if qs:
            return qs
        else:
            raise ValidationError("You are not authorized to view this page.")

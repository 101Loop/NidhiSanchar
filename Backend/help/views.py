from rest_framework import generics

from help.models import Help
from help.serializers import HelpSerializer


class HelpCreateView(generics.CreateAPIView):
    """
    Creates Help Requests in the System
    """

    serializer_class = HelpSerializer
    queryset = Help.objects.all()

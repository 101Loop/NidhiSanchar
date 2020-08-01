from drfaddons.generics import CreateRetrieveUpdateDestroyByUserAPIView
from rest_framework.parsers import MultiPartParser

from .models import UserProfile
from .serializers import UserImageSerializer
from .serializers import UserProfileSerializer


class CreateRetrieveUpdateUserProfileView(CreateRetrieveUpdateDestroyByUserAPIView):
    """
    This view will allow the user to retrieve, add, update or delete his/her profile details.
    get: Retrieve a user profile.
    post: Create a new user profile.
    patch: Update details of user profile.
    delete: Delete a user profile.
    """

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def get_object(self):
        from .models import UserProfile

        obj, created = UserProfile.objects.get_or_create(created_by=self.request.user)
        return obj


class CreateRetrieveUpdateUserPicView(CreateRetrieveUpdateDestroyByUserAPIView):
    """
    This view will allow the user to retrieve, add, update or delete his/her profile details.
    get: Retrieve a user profile.
    post: Create a new user profile.
    patch: Update details of user profile.
    delete: Delete a user profile.
    """

    serializer_class = UserImageSerializer
    queryset = UserProfile.objects.all()
    parser_classes = (MultiPartParser,)

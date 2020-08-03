from django.utils.text import gettext_lazy as _
from rest_framework import generics
from rest_framework.exceptions import ValidationError, NotFound

from department.models import CentreDepartment, StateDepartment
from department.permissions import is_centre_user
from schemes.models import Scheme
from .models import RequestDiscussion, Message, SchemeDiscussion, SchemeMessage
from .serializers import (
    DiscussionSerializer,
    MessageSerializer,
    SchemeDiscussionSerializer,
    SchemeMessageSerializer,
)


# Request Discussion
class DiscussionListCreateView(generics.ListCreateAPIView):
    """
    Request Discussion List View
    ---------------------------
    - get: Lists all those discussions which are active
    - post: Creates a new Discussion
    Notes
    -----
    - To create Discussions, just send `request: {fund_request_id}`
    """

    serializer_class = DiscussionSerializer

    def get_queryset(self):
        user = self.request.user
        qs = RequestDiscussion.objects.filter(is_active=True)
        if qs:
            if is_centre_user(user):
                user_dept = CentreDepartment.objects.get(dept_poc=user)
                return qs.filter(request__scheme__created_by=user_dept)
            else:
                user_dept = StateDepartment.objects.get(dept_poc=user)
                return qs.filter(
                    parent_scheme__created_by__dept_name=user_dept.dept_name
                )
        else:
            raise NotFound("Discussions Does Not Exist, Please Create One.")

    def perform_create(self, serializer):
        """
        This will create Scheme Discussion Object
        Parameters
        ----------
        serializer
        Returns
        -------
        Scheme Discussion Object
        """
        try:
            RequestDiscussion.objects.get(request_id=self.request.data["request"])
        except RequestDiscussion.DoesNotExist:
            serializer.save(
                created_by=self.request.user, request_id=self.request.data["request"]
            )
        else:
            raise ValidationError(_("Discussion for this Fund Request Already Exists."))


class DiscussionRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    Request Discussion Retrieve Update View
    ----------------------
    - This view lets an user to update the status of Discussion
    """

    serializer_class = DiscussionSerializer
    queryset = RequestDiscussion.objects.all()
    lookup_field = "pk"


class MessageListCreateView(generics.ListCreateAPIView):
    """
    Request Message List Create View
    -------------------------------
    - get: List all the messages of a given SchemeDiscussion ID
    - post: Creates a new message in the discussion, if the user is from state or center
    Notes
    -----
    To create message, send `message: {my_awesome_text}`
    """

    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    lookup_field = "discussion_id"

    def filter_queryset(self, queryset):
        """
        This will filter the queryset to return all messages within the given discussion id.
        Parameters
        ----------
        queryset
        Returns
        -------
        queryset
        """

        discussion_id = self.kwargs.pop("discussion_id")
        qs = super(MessageListCreateView, self).filter_queryset(queryset=queryset)
        try:
            request_discussion = RequestDiscussion.objects.get(pk=discussion_id)
        except RequestDiscussion.DoesNotExist:
            raise NotFound(
                _(
                    f"Discussions with {discussion_id} does not exists. Please create one."
                )
            )
        else:
            self.check_object_permissions(request=self.request, obj=request_discussion)
            return qs.filter(discussion=request_discussion)

    def perform_create(self, serializer):
        """
        This will pass parent_discussion_id when creating messages
        Parameters
        ----------
        serializer
        Returns
        -------
        Creates Scheme Message Object
        """
        # getting parent_discussion_id
        request_discussion_id = self.kwargs["discussion_id"]
        serializer.save(discussion_id=request_discussion_id)


class MessageUpdateView(generics.UpdateAPIView):
    """
    Request Message Update View
    --------------------------
    - post: This update view will let a user to update his/her messages
    Notes
    -----
    To update message, send `message: {my_awesome_text}`
    """

    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def perform_update(self, serializer):
        super(MessageUpdateView, self).perform_update(serializer=serializer)

        user = self.request.user
        message_id = self.kwargs["pk"]
        discussion_id = self.kwargs["discussion_id"]

        try:
            message = Message.objects.get(id=message_id)
        except Message.DoesNotExist:
            raise NotFound("Message Does not exist")
        else:
            if not message.sender == user:
                raise ValidationError(
                    "You can only update the messages that was created by you."
                )
            serializer.save(discussion_id=discussion_id)


# Scheme Discussion
class SchemeDiscussionListCreateView(generics.ListCreateAPIView):
    """
    Scheme Discussion List View
    ---------------------------
    - get: Lists all those discussions which are active
    - post: Creates a new Discussion
    Notes
    -----
    - To create Discussions, just send `scheme: {scheme_id}`
    """

    serializer_class = SchemeDiscussionSerializer

    def get_queryset(self):
        user = self.request.user
        qs = SchemeDiscussion.objects.filter(is_active=True)
        if qs:
            if is_centre_user(user):
                user_dept = CentreDepartment.objects.get(dept_poc=user)
                return qs.filter(parent_scheme__created_by=user_dept)
            else:
                user_dept = StateDepartment.objects.get(dept_poc=user)
                return qs.filter(
                    parent_scheme__created_by__dept_name=user_dept.dept_name
                )
        else:
            raise NotFound("Discussions Does Not Exist, Please Create One.")

    def perform_create(self, serializer):
        """
        This will create Scheme Discussion Object
        Parameters
        ----------
        serializer
        Returns
        -------
        Scheme Discussion Object
        """
        try:
            SchemeDiscussion.objects.get(parent_scheme_id=self.request.data["scheme"])
        except SchemeDiscussion.DoesNotExist:
            serializer.save(
                created_by=self.request.user,
                parent_scheme_id=self.request.data["scheme"],
            )
        else:
            raise ValidationError(_("Discussion for this Scheme Already Exists."))


class SchemeDiscussionRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    Scheme Discussion Update View
    ----------------------
    - This view lets an user to update the status of Discussion
    """

    serializer_class = SchemeDiscussionSerializer
    queryset = SchemeDiscussion.objects.all()
    lookup_field = "pk"


class SchemeMessageListCreateView(generics.ListCreateAPIView):
    """
    Scheme Message List Create View
    -------------------------------
    - get: List all the messages of a given SchemeDiscussion ID
    - post: Creates a new message in the discussion, if the user is from state or center
    Notes
    -----
    To create message, send `message: {my_awesome_text}`
    """

    serializer_class = SchemeMessageSerializer
    queryset = SchemeMessage.objects.all()
    lookup_field = "discussion_id"

    def filter_queryset(self, queryset):
        """
        This will filter the queryset to return all messages within the given discussion id.
        Parameters
        ----------
        queryset
        Returns
        -------
        queryset
        """

        discussion_id = self.kwargs.pop("discussion_id")
        qs = super(SchemeMessageListCreateView, self).filter_queryset(queryset=queryset)
        try:
            scheme_discussion = SchemeDiscussion.objects.get(pk=discussion_id)
        except SchemeDiscussion.DoesNotExist:
            raise NotFound(
                _(
                    f"Discussions with {discussion_id} does not exists. Please create one."
                )
            )
        else:
            self.check_object_permissions(request=self.request, obj=scheme_discussion)
            return qs.filter(scheme_discussion=scheme_discussion)

    def perform_create(self, serializer):
        """
        This will pass parent_discussion_id when creating messages
        Parameters
        ----------
        serializer
        Returns
        -------
        Creates Scheme Message Object
        """
        # getting parent_discussion_id
        scheme_discussion_id = self.kwargs["discussion_id"]
        serializer.save(scheme_discussion_id=scheme_discussion_id)


class SchemeMessageUpdateView(generics.UpdateAPIView):
    """
    Scheme Message Update View
    --------------------------
    - post: This update view will let a user to update his/her messages
    Notes
    -----
    To update message, send `message: {my_awesome_text}`
    """

    serializer_class = SchemeMessageSerializer
    queryset = SchemeMessage.objects.all()

    def perform_update(self, serializer):
        super(SchemeMessageUpdateView, self).perform_update(serializer=serializer)

        user = self.request.user
        message_id = self.kwargs["pk"]
        discussion_id = self.kwargs["discussion_id"]

        try:
            message = SchemeMessage.objects.get(id=message_id)
        except SchemeMessage.DoesNotExist:
            raise NotFound("Message Does not exist")
        else:
            if not message.sender == user:
                raise ValidationError(
                    "You can only update the messages that was created by you."
                )
            serializer.save(scheme_discussion_id=discussion_id)


# Filter Scheme Discussion on the basis of Scheme
class DiscussionPerSchemeListView(generics.ListAPIView):
    """
    Discussion Per Scheme List View
    -------------------------------
    - Gives out the discussion according to the ID of the scheme.
    """

    serializer_class = SchemeDiscussionSerializer
    queryset = SchemeDiscussion.objects.filter(is_active=True)
    lookup_field = "scheme_id"

    def filter_queryset(self, queryset):
        """
        This will filter the queryset to return discussion with the given scheme id.
        Parameters
        ----------
        queryset
        Returns
        -------
        queryset
        """

        scheme_id = self.kwargs.pop("scheme_id")
        qs = super(DiscussionPerSchemeListView, self).filter_queryset(queryset=queryset)
        try:
            scheme = Scheme.objects.get(pk=scheme_id)
        except Scheme.DoesNotExist:
            raise NotFound(
                _(f"Discussions with {scheme_id} does not exists. Please create one.")
            )
        else:
            self.check_object_permissions(request=self.request, obj=scheme)
            return qs.filter(parent_scheme=scheme)

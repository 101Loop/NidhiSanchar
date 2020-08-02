from django.urls import path
from . import views

app_name = "discussions"

urlpatterns = [
    path(
        "v1/discussions-list/",
        views.DiscussionListCreateView.as_view(),
        name="discussions-list",
    ),
    path(
        "v1/discussion/<int:pk>/",
        views.DiscussionRetrieveUpdateView.as_view(),
        name="discussion-retrieve-update-view",
    ),
    path(
        "v1/<int:discussion_id>/messages/",
        views.MessageListCreateView.as_view(),
        name="create-discussion-messages",
    ),
    path(
        "v1/<int:discussion_id>/messages/<int:pk>/",
        views.MessageUpdateView.as_view(),
        name="update-discussion-messages",
    ),
    # Scheme Discussions
    path(
        "v1/scheme-discussions-list/",
        views.SchemeDiscussionListCreateView.as_view(),
        name="scheme-discussions-list",
    ),
    path(
        "v1/scheme-discussion/<int:pk>/",
        views.SchemeDiscussionRetrieveUpdateView.as_view(),
        name="scheme-discussion-retrieve-update-view",
    ),
    path(
        "v1/scheme-discussion/<int:discussion_id>/messages/",
        views.SchemeMessageListCreateView.as_view(),
        name="create-scheme-discussion-messages",
    ),
    path(
        "v1/scheme-discussion/<int:discussion_id>/messages/<int:pk>/",
        views.SchemeMessageUpdateView.as_view(),
        name="update-scheme-discussion-messages",
    ),
    # filtered discussion according to scheme
    path(
        "v1/discussion-per-scheme/<int:scheme_id>/",
        views.DiscussionPerSchemeListView.as_view(),
        name="list-discussion-per-scheme",
    ),
]

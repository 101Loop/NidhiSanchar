from django.urls import path
from . import views

app_name = "schemes"

urlpatterns = [
    path("v1/all-schemes/", views.SchemeListView.as_view(), name="list-schemes"),
    path("v1/create-schemes/", views.SchemeCreateView.as_view(), name="create-scheme"),
    path(
        "v1/update-scheme/<slug:slug>/",
        views.SchemeRetrieveUpdateView.as_view(),
        name="update-scheme",
    ),
    path(
        "v1/fund-request/",
        views.FundRequestListView.as_view(),
        name="list-fund-request",
    ),
    path(
        "v1/create-fund-request/",
        views.FundRequestCreateAPIView.as_view(),
        name="create-fund-request",
    ),
    path(
        "v1/update-fund-request/<int:pk>/",
        views.FundRequestRetrieveUpdateAPIView.as_view(),
        name="retrieve-update-fund-request",
    ),
    path(
        "v1/request-per-scheme/<int:scheme_id>/",
        views.FundRequestPerSchemeListView.as_view(),
        name="request-per-scheme",
    ),
]

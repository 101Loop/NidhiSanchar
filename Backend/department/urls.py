from django.urls import path
from . import views

app_name = "department"

urlpatterns = [
    path(
        "v1/center-department/",
        views.CentreDepartmentView.as_view(),
        name="show-center-department",
    ),
    path(
        "v1/state-department/",
        views.StateDepartmentView.as_view(),
        name="show-state-department",
    ),
    path(
        "v1/stats/<int:pk>/",
        views.LandingPageStatsAPIView.as_view(),
        name="show-landing-page-stats",
    ),
]

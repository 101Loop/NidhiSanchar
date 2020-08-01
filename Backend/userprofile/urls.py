from django.urls import path
from . import views


app_name = "userprofile"


urlpatterns = [
    # ex: api/userprofile/v1/userinfo/
    path(
        "v1/userinfo/",
        views.CreateRetrieveUpdateUserProfileView.as_view(),
        name="Retrieve Update User Info",
    ),
    # ex: api/userprofile/v1/userinfo/pic/
    path(
        "v1/userinfo/pic/",
        views.CreateRetrieveUpdateUserPicView.as_view(),
        name="Retrieve Update User Pic",
    ),
]

from django.urls import path

from help import views

urlpatterns = [
    path("v1/help/", views.HelpCreateView.as_view(), name="create-help-request")
]

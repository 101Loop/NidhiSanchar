from django.dispatch import receiver
from django.db.models.signals import post_save

from drf_user.models import User


@receiver(post_save, sender=User)
def post_registeration(instance: User, created: bool, **kwargs):
    from userprofile.models import UserProfile

    if created:
        UserProfile.objects.get_or_create(created_by=instance)

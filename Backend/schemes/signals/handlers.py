from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.template import Template, Context
from drfaddons.utils import send_message

# from marketplace_template.models import EMail

from schemes.models import FundRequest


@receiver(pre_save, sender=FundRequest)
def pre_save_payment(sender, instance: FundRequest, **kwargs):
    if not instance._state.adding:
        if instance.status == "N":
            message = (
                f"Hey {instance.created_by.dept_poc.name}, "
                + f"Your Fund Request for {instance.scheme.name} amounting ₹{instance.amount} cr. have been created in our system. "
            )
        elif instance.status == "IP":
            message = (
                f"Hey {instance.created_by.dept_poc.name}, "
                + f"Your Fund Request for {instance.scheme.name} amounting ₹{instance.amount} cr. have been updated. "
                + f"Your Fund Request currently is in process."
            )
        elif instance.status == "D":
            message = (
                f"Hey {instance.created_by.dept_poc.name}, "
                + f"Your Fund Request for {instance.scheme.name} amounting ₹{instance.amount} cr. have been updated. "
                + f"The amount you've requested in the fund request have been disbursed."
            )
        elif instance.status == "R":
            message = (
                f"Hey {instance.created_by.dept_poc.name}, "
                + f"Your Fund Request for {instance.scheme.name} amounting ₹{instance.amount} cr. have been updated. "
                + f"For now your fund request have been rejected, we need further clarification for your request.."
            )

        data = {
            "recip_email": [instance.created_by.dept_poc.email],
            "subject": "NidhiSanchar: Support",
            "message": message,
            "recip": [instance.created_by.dept_poc.mobile],
        }

        # send message on mobile and mail
        send_message(**data)
    else:
        pass

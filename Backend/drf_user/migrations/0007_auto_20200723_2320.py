# Generated by Django 2.2.14 on 2020-07-23 17:50

from django.db import migrations, models
import drf_user.models


class Migration(migrations.Migration):

    dependencies = [
        ('drf_user', '0006_auto_20181220_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='authtransaction',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Is Active?'),
        ),
        migrations.AlterField(
            model_name='authtransaction',
            name='token',
            field=models.CharField(max_length=500, unique=True, verbose_name='JWT Token passed'),
        ),
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(max_length=10, unique=True, validators=[drf_user.models.validate_mobile], verbose_name='Mobile Number'),
        ),
    ]

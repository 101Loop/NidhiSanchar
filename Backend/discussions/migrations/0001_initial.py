# Generated by Django 2.2.14 on 2020-08-02 05:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import schemes.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('schemes', '0002_auto_20200802_1106'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SchemeDiscussion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Modified')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Discussion Active?')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Discussion Started By')),
                ('parent_scheme', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='schemes.Scheme')),
            ],
            options={
                'verbose_name': 'Scheme Discussion',
                'verbose_name_plural': 'Scheme Discussions',
                'ordering': ['date_created'],
            },
        ),
        migrations.CreateModel(
            name='SchemeMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Modified')),
                ('message', models.TextField()),
                ('document', models.FileField(blank=True, null=True, upload_to='proposals/', validators=[schemes.validators.validate_file_extension, schemes.validators.file_size], verbose_name='Document')),
                ('scheme_discussion', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='scheme_discussion', to='discussions.SchemeDiscussion')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='message_sender', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Scheme Message',
                'verbose_name_plural': 'Scheme Messages',
                'ordering': ['date_created'],
            },
        ),
        migrations.CreateModel(
            name='RequestDiscussion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Modified')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Discussion Active?')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Discussion Started By')),
                ('request', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='schemes.FundRequest')),
            ],
            options={
                'verbose_name': 'Request Discussion',
                'verbose_name_plural': 'Request Discussions',
                'ordering': ['date_created'],
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Modified')),
                ('message', models.TextField()),
                ('document', models.FileField(blank=True, null=True, upload_to='proposals/', validators=[schemes.validators.validate_file_extension, schemes.validators.file_size], verbose_name='Document')),
                ('discussion', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='parent_discussion', to='discussions.RequestDiscussion')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Message',
                'verbose_name_plural': 'Messages',
                'ordering': ['date_created'],
            },
        ),
    ]

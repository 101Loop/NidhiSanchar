# Generated by Django 2.2.14 on 2020-08-03 06:08

from django.db import migrations, models
import schemes.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Help',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('date_updated', models.DateTimeField(auto_now=True, verbose_name='Date Modified')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('subject', models.CharField(max_length=500, verbose_name='Subject')),
                ('text', models.TextField(verbose_name='Description')),
                ('document', models.FileField(blank=True, null=True, upload_to='proposals/', validators=[schemes.validators.validate_file_extension, schemes.validators.file_size], verbose_name='Document')),
            ],
            options={
                'verbose_name': 'Help',
                'verbose_name_plural': 'Help',
            },
        ),
    ]

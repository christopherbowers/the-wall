# Generated by Django 4.0.5 on 2022-06-03 01:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='WallPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wall_text', models.TextField(verbose_name='wall_text')),
                ('post_date', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wall', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-post_date',),
            },
        ),
    ]

# Generated by Django 4.0.5 on 2022-06-02 20:24

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Wall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wall_text', models.TextField(blank=True, verbose_name='wall_text')),
                ('modified_date', models.DateTimeField(blank=True, default=django.utils.timezone.now, editable=False)),
                ('modified_by', models.ForeignKey(on_delete=models.SET('user account deleted'), related_name='wall', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

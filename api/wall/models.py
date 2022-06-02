from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class Wall(models.Model):

  wall_text = models.TextField(_('wall_text'), blank=True)
  modified_date = models.DateTimeField(
    default=timezone.now,
    editable=False,
    blank=True,)
  modified_by = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.SET('user account deleted'),
    related_name='wall')

  def __str__(self):
    return self.wall_text

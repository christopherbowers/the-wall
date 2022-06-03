from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class WallPost(models.Model):

  wall_text = models.TextField(_('wall_text'), blank=False)
  post_date = models.DateTimeField(
    default=timezone.now,
    editable=False,
    blank=False)
  posted_by = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='wall')

  objects = models.Manager()

  class Meta:
    ordering = ('-post_date',)

  def __str__(self):
    return self.wall_text

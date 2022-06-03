from django.contrib import admin
from .models import WallPost

class WallAdminConfig(admin.ModelAdmin):
  model = WallPost
  list_display = ('id', 'posted_by', 'post_date')
  ordering = ('-post_date',)
  list_filter = ('post_date',)

admin.site.register(WallPost, WallAdminConfig)

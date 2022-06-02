from django.contrib import admin
from .models import Wall

class WallAdminConfig(admin.ModelAdmin):
  model = Wall
  list_display = ('id', 'modified_by', 'modified_date')
  ordering = ('-modified_date',)
  list_filter = ('modified_date',)

admin.site.register(Wall, WallAdminConfig)

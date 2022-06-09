from django.contrib import admin
from .models import AppUser
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
  model = AppUser
  search_fields = ('email',)
  list_filter = ('email', 'is_active', 'is_staff')
  ordering = ('-start_date',)
  list_display = ('id', 'email', 'is_active', 'is_staff')
  fieldsets = (
    (None, {'fields': ('email', 'password')}),
    ('Permissions', {'fields': ('is_staff', 'is_active')}),
  )
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff')}
     ),
  )

admin.site.register(AppUser, UserAdminConfig)

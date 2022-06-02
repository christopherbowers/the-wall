from django.contrib import admin
from .models import AppUser
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
  model = AppUser
  search_fields = ('email', 'first_name', 'last_name')
  list_filter = ('email', 'is_active', 'is_staff')
  ordering = ('-start_date',)
  list_display = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff')
  fieldsets = (
    (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    ('Permissions', {'fields': ('is_staff', 'is_active')}),
  )
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_active', 'is_staff')}
     ),
  )

admin.site.register(AppUser, UserAdminConfig)

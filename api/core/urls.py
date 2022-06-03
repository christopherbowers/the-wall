from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('wall_api.urls', namespace='wall_api')),
    path('api-auth/', include('rest_framework.urls'))
]

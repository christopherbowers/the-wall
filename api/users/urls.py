from django.urls import path
from .views import CreateUser, BlacklistToken, CookieTokenObtainPairView

app_name = 'users'

urlpatterns = [
  path('register/', CreateUser.as_view()),
  # path('token/', CookieTokenObtainPairView.as_view()),
  path('logout/blacklist/', BlacklistToken.as_view())
]

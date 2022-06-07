from django.urls import path
from .views import CreateUser, BlacklistToken, LoadUserView

app_name = 'users'

urlpatterns = [
  path('register/', CreateUser.as_view()),
  path('user/', LoadUserView.as_view()),
  path('logout/blacklist/', BlacklistToken.as_view())
]

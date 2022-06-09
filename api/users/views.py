from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AppUserSerializer
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from django.core.mail import send_mail
from django.conf import settings

class CreateUser(APIView):
  permission_classes = [AllowAny]

  def post(self, request, format='json'):
    serializer = AppUserSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      email_user(serializer.data)
      if user:
        json = serializer.data
        return Response(json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def email_user(request):
  send_mail(
    'Welcome to The Wall App',
    'Welcome to The Wall App',
    settings.EMAIL_HOST_USER,
    ['',request['email']],
    fail_silently=False,
  )
  return True


class BlacklistToken(APIView):
  permission_classes = [AllowAny]
  authentication_classes = ()

  def post(self, request):
    try:
      refresh_token = request.data['refresh_token']
      token = RefreshToken(refresh_token)
      token.blacklist()
      return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class LoadUserView(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    try:
      user = request.user
      user = AppUserSerializer(user)

      return Response(
        {'user': user.data},
        status=status.HTTP_200_OK
      )
    except:
      return Response(
        {'error': 'Something went wrong when trying to load user'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
      )

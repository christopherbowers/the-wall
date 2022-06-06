from rest_framework import generics
from wall.models import WallPost
from .serializers import WallPostSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated


class WallPostUserPermission(BasePermission):
  message = 'Editing posts is restricted to the creator only.'

  def has_object_permission(self, request, view, obj):

    if request.user != obj.created_by:
      return False
    else:
      return obj.created_by == request.user


class PostList(generics.ListAPIView):
    queryset = WallPost.objects.all()
    serializer_class = WallPostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = WallPost.objects.all()
    serializer_class = WallPostSerializer

class PostCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = WallPost.objects.all()
    serializer_class = WallPostSerializer

class PostEditDetails(generics.RetrieveUpdateDestroyAPIView, WallPostUserPermission):
    permission_classes = [WallPostUserPermission]
    queryset = WallPost.objects.all()
    serializer_class = WallPostSerializer

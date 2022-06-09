from django.urls import path
from .views import PostList, PostDetail, PostCreate, PostEditDetails

app_name = 'wall_api'

urlpatterns = [
    path('', PostList.as_view()),
    path('<int:pk>/', PostDetail.as_view()),
    path('<int:pk>/edit/', PostCreate.as_view()),
    path('create/', PostCreate.as_view())
]

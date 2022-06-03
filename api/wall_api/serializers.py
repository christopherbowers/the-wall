from rest_framework import serializers
from wall.models import WallPost


class WallPostSerializer(serializers.ModelSerializer):

    class Meta:
      fields = ('id', 'wall_text', 'posted_by',)
      model = WallPost

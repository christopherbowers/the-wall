from rest_framework import serializers
from users.models import AppUser


class AppUserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
      model = AppUser
      fields = ('id', 'email', 'password')
      extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
      password = validated_data.pop('password', None)
      instance = self.Meta.model(**validated_data)
      if password is not None:
        instance.set_password(password)
      instance.save()
      return instance

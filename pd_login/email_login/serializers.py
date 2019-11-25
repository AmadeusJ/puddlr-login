from rest_framework import serializers
from .models import (
    Test, DemoUserGroup
)

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class DemoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoUserGroup
        fields = '__all__'  
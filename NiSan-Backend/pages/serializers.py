from rest_framework import serializers
from .models import Page

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'
        read_only_fields = ['author', 'created_at', 'updated_at']
        extra_kwargs = {
            'title': {'required': True},
            'content': {'required': True},
        }
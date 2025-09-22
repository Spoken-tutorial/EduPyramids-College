from django.conf import settings
from rest_framework import serializers
from .models import CreationDomain, CreationFosscategory

# Homepage serializers -----------------------------------------
class CourseSerializer(serializers.ModelSerializer):
    # Output keys: name/tag/image
    tag = serializers.SerializerMethodField()
    icon = serializers.SerializerMethodField()

    
    class Meta:
        model = CreationFosscategory
        fields = ['foss', 'tag', 'icon']

    def get_tag(self, obj):
        return ""
    
    def get_icon(self, obj):
        return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
    
class DomainSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(source='fosscategories', many=True)
    icon = serializers.SerializerMethodField()
    
    class Meta:
        model = CreationDomain
        fields = ['name', 'icon', 'courses']

    def get_icon(self, obj):
        if obj.icon:
            return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
        return ""

# Domain Page serializers -----------------------------------------
class CoursePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreationFosscategory
        fields = ['foss', 'description', 'icon']

class DomainsPageSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()
    class Meta:
        model = CreationDomain
        fields = ['id', 'name', 'icon', 'description']

    def get_icon(self, obj):
        return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
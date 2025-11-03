from django.conf import settings
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
from .models import CreationDomain, CreationFosscategory, CreationTutorialresource



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
        if obj.icon:
            return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
        return None
    
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
        if obj.icon:
            return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
        return None
        
    
# Tutorials Page serializers -----------------------------------------
class TutorialListSerializer(serializers.ModelSerializer):
    tutorial_name = serializers.CharField(source="tutorial_detail.tutorial")
    level = serializers.CharField(source="tutorial_detail.level.level")
    order = serializers.CharField(source="tutorial_detail.order")
    thumb = serializers.SerializerMethodField()
    class Meta:
        model = CreationTutorialresource
        fields = ['id', 'outline', 'tutorial_name', 'level', 'order', 'thumb']

    def get_thumb(self, obj):
        # path = settings.MEDIA_URL + 'videos/' + str(row.foss_id) + '/' + str(row.id) + '/' + row.tutorial.replace(' ', '-') + '-' + append_str + '.png'
        path = f"{settings.SPOKEN_MEDIA_HOST}videos/{str(obj.tutorial_detail.foss.id)}/{str(obj.tutorial_detail.id)}/{obj.tutorial_detail.tutorial.replace(' ', '-')}-Small.png"
        
        print(f"\033[92m path \033[0m")
        print(path)
        return path
    
class CourseListSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()
    class Meta:
        model = CreationFosscategory
        fields = ['foss', 'description', 'icon']

    def get_icon(self, obj):
        if obj.icon:
            return f"{settings.SPOKEN_MEDIA_HOST}{obj.icon.url}"
        return None

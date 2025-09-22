from django.conf import settings
from rest_framework import serializers
from .models import CarouselItem

class CarouselItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = CarouselItem
        fields = ["id", "image", "alt_text", "caption", "link_url", "sort_order"]

    def get_image(self, obj):
        return f"{settings.HOST}{obj.image.url}"


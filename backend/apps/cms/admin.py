from django.contrib import admin
from .models import CarouselItem

# Register your models here.
@admin.register(CarouselItem)
class CarouselItemAdmin(admin.ModelAdmin):
    list_display = ("sort_order", "image", "alt_text", "caption", "link_url", "is_active", "starts_at", "ends_at")


    # extra = 1
    # fields = ("sort_order", "image", "alt_text", "caption", "link_url", "is_active", "starts_at", "ends_at")
    # readonly_fields = ()
    # ordering = ("sort_order", "-created")
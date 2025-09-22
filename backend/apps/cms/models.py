from django.db import models

# Create your models here.
class CarouselItem(models.Model):
    carousel = models.CharField(max_length=255) #Tag referencing the carousel page Eg: Homepage, News Page
    image = models.ImageField(upload_to="carousel")
    alt_text = models.CharField(max_length=255, blank=True)
    caption = models.CharField(max_length=255, blank=True)
    link_url = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)
    starts_at = models.DateTimeField(null=True, blank=True)
    ends_at = models.DateTimeField(null=True, blank=True)

    sort_order = models.PositiveIntegerField(default=0, db_index=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', 'created']

    def __str__(self):
        return f"{self.carousel} - {self.caption or self.alt_text or self.image.name}"
    


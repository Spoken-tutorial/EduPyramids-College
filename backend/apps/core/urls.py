# backend/apps/core/urls.py
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import health, HomepageView, HPFiltersView

urlpatterns = [
    path("payments/", include("apps.payments.urls")),
    path("health/", health, name="health"),
    path("homepage/", HomepageView.as_view(), name="homepage"),
    path("filters/", HPFiltersView.as_view(), name="filters"),
]

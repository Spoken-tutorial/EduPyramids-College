# backend/apps/core/urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import DomainCourseView, TutorialSearchView

urlpatterns = [
    path("domains/", DomainCourseView.as_view(), name="health"),
    path("domains/<int:pk>/", DomainCourseView.as_view(), name="health"),
    # path("tutorials/<str:search_foss>/<str:search_language>/<str:search_domain>", TutorialSearchView.as_view(), name="health"),
    path("tutorials/", TutorialSearchView.as_view(), name="health"),

    
]

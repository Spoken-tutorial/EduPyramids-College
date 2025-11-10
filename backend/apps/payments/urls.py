from django.urls import path
from . import views

urlpatterns = [
    path('academic/session/', views.create_academic_payment_session, name='create-academic-session'),
    path('academic/status/<str:order_id>/', views.check_payment_status, name='check-academic-status'),
]

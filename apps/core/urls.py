"""
Core app URL configuration.
"""
from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('content/<slug:slug>/', views.content_detail, name='content_detail'),
    path('cars/', views.car_list, name='car_list'),
    path('cars/<int:pk>/', views.car_detail, name='car_detail'),
    path('cars/tco-calculator/', views.car_tco_calculator, name='car_tco_calculator'),
]

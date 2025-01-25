from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.get_items_from_json, name='get_items_from_json'),
    path('update_features/', views.update_features, name='update_features'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
]

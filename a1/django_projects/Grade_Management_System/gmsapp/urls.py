from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin_info', views.admin_info, name='admin_info'),
    path('admin_registration', views.admin_registration, name='admin_registration'),
    path('student_info', views.student_info, name='student_info'),
    path('student_registration', views.student_registration, name='student_registration'),
]

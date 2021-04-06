from django.urls import path
from blogpage import views

urlpatterns = [
    path('', views.users, name='users'),
    path('users/', include('blogpage.urls')),
]

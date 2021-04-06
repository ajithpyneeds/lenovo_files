from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^registration/', views.registration, name='registration'),
    url(r'^sign_in/', views.sign_in, name='sign_in'),
    url(r'^logout/', views.logout, name='logout'),
]

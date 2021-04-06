from django.conf.urls import url
from play import views

urlpatterns = [
	url(r'^$', views.help, name='play-help'),
]
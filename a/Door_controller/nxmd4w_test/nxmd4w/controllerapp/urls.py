from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home2', views.home2, name='home2'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('change_password/', views.change_password, name='change_password'),
    path('cloud/', views.cloud, name='cloud'),
    path('datentime/', views.datentime, name='datentime'),
    path('emergency/', views.emergency, name='emergency'),
    path('enrollment/', views.enrollment, name='enrollment'),
    path('general/', views.general, name='general'),
    path('holiday/', views.holiday, name='holiday'),
    path('ipsettings/', views.ipsettings, name='ipsettings'),
    path('mssql/', views.mssql, name='mssql'),
    path('mysql/', views.mysql, name='mysql'),
    path('parameters/', views.parameters, name='parameters'),
    path('timezone/', views.timezone, name='timezone'),
    path('transaction/', views.transaction, name='transaction'),
    path('usertimezone/', views.usertimezone, name='usertimezone'),
    path('door1/', views.door1, name='door1'),
    path('door2/', views.door2, name='door2'),
    path('door3/', views.door3, name='door3'),
    path('door4/', views.door4, name='door4'),
]

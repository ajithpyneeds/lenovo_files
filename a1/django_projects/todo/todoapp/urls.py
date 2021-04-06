from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('signin/', views.signin, name='signin'),
    path('delete/<list_id>', views.delete, name='delete'),
    path('task_done/<list_id>', views.task_done, name='task_done'),
    path('yet_to_complete/<list_id>', views.yet_to_complete, name='yet_to_complete'),
    path('edit/<list_id>', views.edit, name='edit'),
]

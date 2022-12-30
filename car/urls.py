from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('docs', views.documentation, name="docs"),
    path('interactive', views.interactive, name="interactive")
]
from django.conf.urls import url
from . import views
urlpatterns = [
	url(r'^pacman/', views.pacman, name="pacman"),
	url(r'^code/', views.code, name="code"),
	url(r'^about/', views.about, name="about"),
	url(r'^contact/', views.contact, name="contact"),
	url(r'^$', views.index, name="index")
]
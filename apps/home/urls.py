from django.conf.urls import url
from . import views
from django.views.generic.base import RedirectView
urlpatterns = [
	url(r'^favicon\.ico$', RedirectView.as_view(url='/static/home/images/favicon.ico')),
	url(r'^code/', views.code, name="code"),
	url(r'^about/', views.about, name="about"),
	url(r'^contact/', views.contact, name="contact"),
	url(r'^$', views.index, name="index")
]
from django.conf.urls import url
from . import views
from django.views.generic.base import RedirectView
urlpatterns = [
	url(r'^favicon\.ico$', RedirectView.as_view(url='/static/home/images/favicon.ico')),
	url(r'^code/', views.code, name="code"),
	url(r'^contact/', views.contact, name="contact"),
	url(r'^authors_api_doc/', views.authors_api_doc, name="authors_api_doc"),
	url(r'^$', views.about, name="index")
]
from django.conf.urls import url

from . import views

app_name = 'blockbreak'
urlpatterns = [
    url(r'^$', views.index, name='index')
]

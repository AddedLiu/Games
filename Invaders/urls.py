from django.conf.urls import url
from . import views

app_name = 'Invaders'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^signup/$', views.register, name='signup')
]

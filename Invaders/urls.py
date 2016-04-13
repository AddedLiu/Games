from django.conf.urls import url
from . import views

app_name = 'Invaders'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^index$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^do_register/$', views.do_register, name='do_register'),
    url(r'^register_success/$', views.register_success, name='register_success'),
    url(r'^register_fail/$', views.register_fail, name='register_fail'),
    url(r'^login/$', views.login, name='login'),
    url(r'^do_login/$', views.do_login, name='do_login'),
    url(r'^logout/$', views.do_logout, name='do_logout'),
]

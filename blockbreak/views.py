from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic.base import TemplateView
# Create your views here.


class HomePageView(TemplateView):
    template_name = 'blockbreak/home.html'


def index(request):
    return HttpResponse("Hello, world!")



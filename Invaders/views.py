from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone

from .models import User


def index(request):
    output = "welcome"
    return render(request, 'Invaders/index.html', {'output': output})


def register(request):
    return render(request, 'Invaders/registration_form.html')


def register_success(request):
    return render(request, 'Invaders/register_success.html')


def register_fail(request):
    return render(request, 'Invaders/register_fail.html')


def do_register(request):
    try:
        username = request.POST['username']
        password = request.POST['password']
        user = User(username=username, password=password,
                    high_score=0, create_date=timezone.now())
        user.save()
        request.session['logged_in_user'] = user
    except KeyError as e:
        print(e)
        return HttpResponseRedirect(reverse('Invaders:register_fail'))
    else:
        return HttpResponseRedirect(reverse('Invaders:register_success'))

# Create your views here.

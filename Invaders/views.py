from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import User


def index(request):
    return render(request, 'Invaders/index.html')


def register(request):
    return render(request, 'Invaders/register.html')


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
        request.session['high_score'] = user.high_score
        request.session['logged_in_user'] = user
    except KeyError as e:
        print(e)
        return HttpResponseRedirect(reverse('Invaders:register_fail'))
    else:
        return HttpResponseRedirect(reverse('Invaders:register_success'))


def do_logout(request):
    """
    logout
    """
    try:
        del request.session['logged_in_user']
    except KeyError as e:
        print(e)
    return HttpResponseRedirect(reverse('Invaders:index'))


def login(request):
    """
    Login
    """
    return render(request, 'Invaders/login.html')


def do_login(request):
    """
    Try to login
    """
    try:
        user = User.objects.get(username=request.POST['username'])
        if user.password == request.POST['password']:
            request.session['logged_in_user'] = user
            return HttpResponseRedirect(reverse('Invaders:index'))
        else:
            return render(request, 'Invaders/login.html', {'username': user.username,
                                                           'error_message': 'Login failed, please try again'})
    except (KeyError, User.DoesNotExist):
        return render(request, 'Invaders/login.html',
                      {'error_message': "Login failed, user does not exist"})


def update_high_score(request):
    try:
        user = request.session['logged_in_user']
        user.high_score = request.GET['userHighScore']
        user.save()
        return HttpResponseRedirect(reverse('Invaders:index'))
    except (KeyError, User.DoesNotExist):
        return render(request, 'Invaders/login.html',
                      {'error_message': "Login failed, user does not exist"})

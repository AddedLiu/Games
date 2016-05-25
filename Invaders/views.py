from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.utils import timezone

from .models import User


def index(request):
    users = User.objects.get_queryset().order_by("-high_score")
    return render(request, 'Invaders/index.html', {'users': users})


def register(request):
    return render(request, 'Invaders/register.html')


def register_success(request):
    return render(request, 'Invaders/register_success.html')


def register_fail(request):
    return render(request, 'Invaders/register_fail.html')


def do_register(request):
    try:
        # if username is exist, return register fail
        if User.objects.get(username=request.POST['username']):
            return HttpResponseRedirect(reverse('Invaders:register_fail'))
    except KeyError as e:
        print(e)
        return HttpResponseRedirect(reverse('Invaders:register_fail'))
    # When username isn't exist
    except ObjectDoesNotExist:
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        # if password equals confirm password, save this user and return register success
        if password == confirm_password:
            user = User(username=username, password=password,
                        high_score=0, create_date=timezone.now())
            user.save()
            request.session['high_score'] = user.high_score
            request.session['logged_in_user'] = user
            return HttpResponseRedirect(reverse('Invaders:register_success'))
        # if password != confirm password, return register fail
        else:
            return HttpResponseRedirect(reverse('Invaders:register_fail'))


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
        score = int(request.GET['userScore'])
        if score > user.get_score():
            user.high_score = score
            user.save()
        return HttpResponseRedirect(reverse('Invaders:index'))
    except (KeyError, User.DoesNotExist):
        return render(request, 'Invaders/login.html',
                      {'error_message': "Login failed, user does not exist"})

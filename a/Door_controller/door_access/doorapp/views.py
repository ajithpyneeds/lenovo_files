from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib import messages
from .forms import SignUpForm, EditProfileForm

def base(request):
    return render(request, 'doorapp/base.html')

def home(request):
    return render(request, 'doorapp/home.html')

def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, password=password, username=username)
        if user is not None:
            login(request, user)
            messages.success(request, ('You have been logged in...'))
            return redirect('home')
        else:
            messages.success(request, ('Invalid Credentials, Please try again!...'))
            return redirect('login')
    else:
        return render(request, 'doorapp/login.html')

def logout_user(request):
    logout(request)
    messages.success(request, 'You have been Logged Out!...')
    return redirect('base')

def register_user(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login (request, user)
            messages.success(request, 'You have Registerd...')
            return redirect('base')
    else:
        form = SignUpForm()

    context = {'form':form}
    return render(request, 'doorapp/register.html',context)

def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'You have made changes to the Profile...')
            return redirect('base')
    else:
        form = EditProfileForm(instance=request.user)

    context = {'form':form}
    return render(request, 'doorapp/edit_profile.html',context)

def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            messages.success(request, 'You have changed your Password...')
            return redirect('base')
    else:
        form = PasswordChangeForm(user=request.user)

    context = {'form':form}
    return render(request, 'doorapp/change_password.html',context)

def cloud(request):
    return render(request, 'doorapp/cloud.html')

def datentime(request):
    return render(request, 'datentime/home.html')

def emergency(request):
    return render(request, 'doorapp/emergency.html')

def enrollment(request):
    return render(request, 'doorapp/enrollment.html')

def general(request):
    return render(request, 'doorapp/general.html')

def holiday(request):
    return render(request, 'doorapp/holiday.html')

def ipsettings(request):
    return render(request, 'doorapp/ipsettings.html')

def mssql(request):
    return render(request, 'doorapp/mssql.html')

def mysql(request):
    return render(request, 'doorapp/mysql.html')

def parameters(request):
    return render(request, 'doorapp/parameters.html')

def timezone(request):
    return render(request, 'doorapp/timezone.html')

def transaction(request):
    return render(request, 'doorapp/transaction.html')

def usertimezone(request):
    return render(request, 'doorapp/usertimezone.html')

def door1(request):
    return render(request, 'doorapp/door1.html')

def door2(request):
    return render(request, 'doorapp/door2.html')

def door3(request):
    return render(request, 'doorapp/door3.html')

def door4(request):
    return render(request, 'doorapp/door4.html')

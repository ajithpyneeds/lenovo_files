from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib import messages
from .forms import SignUpForm, EditProfileForm

def home(request):
    return render(request, 'home.html')

def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, password=password, username=username)
        if user is not None:
            login(request, user)
            messages.success(request, ('You have been logged in...'))
            return redirect('home2')
        else:
            messages.success(request, ('Invalid Credentials, Please try again!...'))
            return redirect('login')
    else:
        return render(request, 'login.html')

def logout_user(request):
    logout(request)
    messages.success(request, 'You have been Logged Out!...')
    return redirect('home')


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
            return redirect('home')
    else:
        form = SignUpForm()

    context = {'form':form}
    return render(request, 'register.html',context)

def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'You have made changes to the Profile...')
            return redirect('home')
    else:
        form = EditProfileForm(instance=request.user)

    context = {'form':form}
    return render(request, 'edit_profile.html',context)

def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            messages.success(request, 'You have changed your Password...')
            return redirect('home')
    else:
        form = PasswordChangeForm(user=request.user)

    context = {'form':form}
    return render(request, 'change_password.html',context)

def home2(request):
    context = {'name' : 'username'}
    return render(request, 'home2.html', context)

def cloud(request):
    return render(request, 'cloud.html')

def datentime(request):
    return render(request, 'datentime.html')

def emergency(request):
    return render(request, 'emergency.html')

def enrollment(request):
    return render(request, 'enrollment.html')

def general(request):
    return render(request, 'general.html')

def holiday(request):
    return render(request, 'holiday.html')

def ipsettings(request):
    return render(request, 'ipsettings.html')

def mssql(request):
    return render(request, 'mssql.html')

def mysql(request):
    return render(request, 'mysql.html')

def parameters(request):
    return render(request, 'parameters.html')

def timezone(request):
    return render(request, 'timezone.html')

def transaction(request):
    return render(request, 'transaction.html')

def usertimezone(request):
    return render(request, 'usertimezone.html')

def door1(request):
    return render(request, 'door1.html')

def door2(request):
    return render(request, 'door2.html')

def door3(request):
    return render(request, 'door3.html')

def door4(request):
    return render(request, 'door4.html')

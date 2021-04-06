from django.shortcuts import render,redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages

# Create your views here.
def registration(request):

    if request.method == 'POST':

        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        service = request.POST['service']

        if password1==password2:

            if User.objects.filter(username=username).exists():
                messages.info(request,'Username taken')
                return redirect('registration')

            elif User.objects.filter(email=email).exists():
                messages.info(request,'Email taken')
                return redirect('registration')
            else:
                user = User.objects.create_user(first_name=first_name, last_name=last_name, username=username, email=email, password=password1, service=service)
                user.save()
                messages.info(request,'User Created')
                return redirect('sign_in')

        else:
            messages.info(request,'Passsword not matching...')
            return redirect('registration')

    else:
        return render(request, 'register.html')

def sign_in(request):

    if request.method=='POST':

        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')

        else:
            messages.info(request,'Invalid Credentials...')
            return redirect('sign_in')

    else:
        return render(request, 'sign_in.html')

def logout(request):
    auth.logout(request)
    return redirect('/')

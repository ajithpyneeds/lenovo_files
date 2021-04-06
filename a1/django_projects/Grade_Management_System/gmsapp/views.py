from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponseRedirect
from .models import StudentsInfo
from .forms import StudentForm, AdminForm

def home(request):
    return render(request, 'gmsapp/home.html')

def admin_info(request):
    return render(request, 'gmsapp/admin_page.html')

def student_info(request):
    return render(request, 'gmsapp/student_page.html')

def student_registration(request):
    if request.method == 'POST':
        form = StudentsInfo(request.POST or None)

        if form.is_valid():
            form.save()
            all_details = StudentsInfo.objects.all
            messages.success(request, "You have successfully registered...")
            return redirect('home')

    else:
        all_details = StudentsInfo.objects.all
        return render(request, 'gmsapp/student_register.html')

def admin_registration(request):
    if request.method == 'POST':
        form = AdminInfo(request.POST or None)

        if form.is_valid():
            form.save()
            all_details = AdminInfo.objects.all
            messages.success(request, "You have successfully registered...")
            return redirect('home')

    else:
        all_details = AdminInfo.objects.all
        return render(request, 'gmsapp/admin_register.html')

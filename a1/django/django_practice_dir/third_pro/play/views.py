from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return HttpResponse('<h1>Hi There!</h1>')

def help(request):
	d = { 'name' : 'Ajith'}
	return render(request, 'play/help.html', context=d)
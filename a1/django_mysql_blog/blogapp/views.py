from django.shortcuts import render
from .models import Posts

def home(request):

    posts = Posts.objects.all()[:10]

    context = {'title': 'Latest Blogs', 'posts': posts}

    return render(request, 'home.html', context)

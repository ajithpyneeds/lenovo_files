from django.shortcuts import render

posts = [
	{
		'author' : 'Ajith',
		'title': 'Blog Post 1',
		'content' : 'First post content',
		'date_posted' : 'November 10, 2018'
	},
	{
		'author' : 'Rajath',
		'title': 'Blog Post 2',
		'content' : 'Second post content',
		'date_posted' : 'January 01, 2019'
	}
]

def home(request):
	context = {
		'posts' : posts
	}
	return render(request, 'blog/home.html', context)

def about(request):
    return render(request, 'blog/about.html')
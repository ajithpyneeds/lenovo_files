from django.shortcuts import render

def project_list(request):
    return render(request, 'budgetApp/project-list.html')

def project_detail(request, project_slug):
    return render(request, 'budgetApp/project-detail.html')

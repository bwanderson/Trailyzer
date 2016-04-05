from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'trailyzer/home.html', context)

def Example(request):
    context={}
    return render(request, 'trailyzer/Example.html',context)

def ExampleA(request):
    context={}
    return render(request, 'trailyzer/ExampleA.html',context)

def EndUser(request):
    context={}
    return render(request, 'trailyzer/EndUser.html',context)

def TechnicalSpecs(request):
    context={}
    return render(request, 'trailyzer/TechnicalSpecs.html',context)
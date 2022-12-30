from django.shortcuts import render, redirect
from .models import *


# Create your views here.

def home(request):
    return render(request, 'car/index.html')


def documentation(request):
    return render(request, 'car/Documentation.html')


def interactive(request):
    return render(request, 'car/segmentIntersection.html')

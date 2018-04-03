from django.shortcuts import render, HttpResponse, redirect
# the index function is called when root is visited
APP_NAME = 'home'

def index(request):
	return render(request, APP_NAME + '/index.html', {"home":True})
def about(request):
	return render(request, APP_NAME + '/about.html', {"about":True});
def contact(request):
	return render(request, APP_NAME + '/contact.html', {"contact":True});
def code(request):
	return render(request, APP_NAME + '/code.html', {"code":True});
def pacman(request):
	return render(request, APP_NAME + '/pacman_shell.html');
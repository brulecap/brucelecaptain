from django.shortcuts import render, HttpResponse, redirect
import random
# import Quote
from .models import Quotes

num_quotes = len(Quotes.objects)

APP_NAME = 'home'

def about(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/about.html', {"home":True, "quote":Quotes.objects[which_quote].quote, "source": Quotes.objects[which_quote].source});
def contact(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/contact.html', {"contact":True, "quote":Quotes.objects[which_quote].quote, "source": Quotes.objects[which_quote].source});
def code(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/code.html', {"code":True, "quote":Quotes.objects[which_quote].quote, "source": Quotes.objects[which_quote].source});
def pacman(request):
	return render(request, APP_NAME + '/pacman_shell.html');
def authors_api_doc(request):
	return render(request, APP_NAME + '/authors_api_docs.html');
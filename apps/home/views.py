from django.shortcuts import render, HttpResponse, redirect
import random
# import Quote
from .models import Quotes


quotes = Quotes.objects()
num_quotes = len(quotes)
#print(Quotes.objects().to_json())

APP_NAME = 'home'

def about(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/about.html', {"home":True, "quotes": quotes.to_json()});
def contact(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/contact.html', {"contact":True, "quotes": quotes.to_json()});
def code(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/code.html', {"code":True, "quotes": quotes.to_json()});
def google_books(request):
	which_quote = random.randint(1,num_quotes)
	return render(request, APP_NAME + '/google_books.html', {"google_books":True, "quotes": quotes.to_json()});
def pacman(request):
	return render(request, APP_NAME + '/pacman_shell.html');
def authors_api_doc(request):
	return render(request, APP_NAME + '/authors_api_docs.html');
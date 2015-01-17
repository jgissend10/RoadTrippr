from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, render_to_response, HttpResponseRedirect
from django.contrib.auth import logout
from django.contrib.auth.models import User
import requests
import json
from django.core import serializers
from django.http import HttpResponse
from django.conf import settings

def home(request):
    if request.user.is_authenticated():
        return render_to_response('loggedIn.html', {'user': request.user})
    else:
        return render_to_response('login.html')

@login_required
def logout_view(request):
    logout(request)
    return redirect('/')

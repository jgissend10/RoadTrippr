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
from models import Trip, Waypoint

def home(request):
    if request.user.is_authenticated():
        return render_to_response('loggedIn.html', {'user': request.user})
    else:
        return render_to_response('login.html')

@login_required
def logout_view(request):
    logout(request)
    return redirect('/')

def trip_json(request, pk):
    trip = Trip.objects.filter(pk=pk)[0]
    data = {'StartLoc':trip.start_location,
            'EndLoc': trip.end_location,
            'StartDateTime': str(trip.start_datetime),
            'MaxDrive': float(trip.max_drive_time),
            'StartDay': trip.day_start_time.strftime("%H:%M"),
            'Lunch': trip.lunch_time.strftime("%H:%M"),
            'Dinner': trip.dinner_time.strftime("%H:%M"),
            'Travelers': [(t.pk, t.username) for t in trip.travelers.all()],
            'Waypoints': [w.pk for w in Waypoint.objects.filter(trip=trip)],
            'pk': pk}
    return HttpResponse(json.dumps(data), content_type='application/json')   

def waypoint_json(request, pk):
    waypoint = Waypoint.objects.filter(pk=pk)[0]
    data = {'Trip': waypoint.trip.pk,
            'Arrival': str(waypoint.arrival_datetime),
            'Departure': str(waypoint.departure_datetime),
            'Location': waypoint.location,
            'NextWaypoint': waypoint.next_waypoint.pk if not waypoint.next_waypoint is None else 0,
            'PreviousWaypoint': waypoint.previous_waypoint.pk if not waypoint.previous_waypoint is None else 0,
            'pk': pk}
    return HttpResponse(json.dumps(data), content_type='application/json')   

def waypoints_json(request, pk):
    pass

def user_json(request, pk):
    user = User.objects.filter(pk=pk)[0]
    data = {'Username':user.username,
            'pk': user.pk,
            'Trips': [t.pk for t in Trip.objects.filter(travelers=user)],
           }
    return HttpResponse(json.dumps(data), content_type='application/json')   

def trips_json(request):
    context = {}
    context.update(csrf(request))
    if request.method == "POST":
        trip = Trip()
        trip.start_location = request.POST.get('StartLoc', 'None')
        trip.end_location = request.POST.get('EndLoc', 'None')
        trip.start_datetime = request.POST.get('StartDateTime', 'None')
        trip.save()
        trip.travelers.add(request.user)
        trip.save()
        w1 = Waypoint()
        w1.trip = trip
        w1.location = trip.start_location
        w2 = Waypoint()
        w2.trip = trip
        w2.location = trip.end_location
        return HttpResponseRedirect(reverse('roadtrippr.views.trip_json', args=(trip.pk,)))
    else:
        user = request.user
        data = {'Username':user.username,
            'pk': user.pk,
            'Trips': [t.pk for t in Trip.objects.filter(travelers=user)],
           }
        return HttpResponse(json.dumps(data), content_type='application/json')   

def createTrip(request):
    context = {}
    context.update(csrf(request))
    return render(request, 'createTrip.html', context)    

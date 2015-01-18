from django.db import models
from django.contrib.auth.models import User
import requests
from django.conf import settings
from datetime import time
#Create your models here.

class Trip(models.Model):
    travelers = models.ManyToManyField(User)
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    max_drive_time = models.DecimalField(max_digits=5, decimal_places=2, default=8.0)
    day_start_time = models.TimeField(default=time(8,00))
    lunch_time = models.TimeField(default=time(12,00))
    dinner_time = models.TimeField(default=time(18,00))

    def __str__(self):
        return self.start_location + " -> " + self.end_location

class Waypoint(models.Model):
    trip = models.ForeignKey(Trip)
    arrival_datetime = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=255)
    departure_datetime = models.DateTimeField(blank=True, null=True)
    previous_waypoint = models.ForeignKey('self', related_name='prev', blank=True, null=True)
    next_waypoint = models.ForeignKey('self', related_name='next', blank=True, null=True)

    def __str__(self):
        return self.location

class GasStation(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.CharField(max_length=7)

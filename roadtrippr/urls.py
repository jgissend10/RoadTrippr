from django.conf.urls import patterns, include, url
from django.contrib import admin
from models import Trip, Waypoint
from rest_framework import viewsets, routers

# ViewSets define the view behavior.
class TripViewSet(viewsets.ModelViewSet):
    model = Trip

class WaypointViewSet(viewsets.ModelViewSet):
    model = Waypoint

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'waypoints', WaypointViewSet)

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'roadtrippr.views.home', name='home'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^logout/','roadtrippr.views.logout_view'),
#    url(r'^api/trip/(?P<pk>[\d]+)/$','roadtrippr.views.trip_json'),
#    url(r'^api/waypoint/(?P<pk>[\d]+)/$','roadtrippr.views.waypoint_json'),
#    url(r'^api/trip/(?P<pk>[\d]+)/waypoints/$','roadtrippr.views.waypoints_json'),
#    url(r'^api/trips/$','roadtrippr.views.trips_json'),
#    url(r'^api/user/(?P<pk>[\d]+)/$','roadtrippr.views.user_json'),
#    url(r'^createTrip/$','roadtrippr.views.createTrip'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/rest/', include(router.urls)),
)

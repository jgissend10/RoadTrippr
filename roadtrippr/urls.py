from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from models import Trip, Waypoint, GasStation
from rest_framework import viewsets, serializers, routers

# Serializers define the API representation.
class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = ('pk', 'travelers', 'start_location',
                  'end_location', 'start_datetime', 'max_drive_time',
                  'day_start_time', 'lunch_time', 'dinner_time', 'waypoint_set')

class WaypointSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Waypoint
        fields = ('pk', 'trip', 'arrival_datetime', 'location',
                  'departure_datetime', 'previous_waypoint', 'next_waypoint')

class GasStationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GasStation
        fields = ('name', 'location', 'price')

# ViewSets define the view behavior.
class GasStationViewSet(viewsets.ModelViewSet):
    model = GasStation
    queryset = GasStation.objects.all()
    serializer_class = GasStationSerializer

class TripViewSet(viewsets.ModelViewSet):
    model = Trip
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class WaypointViewSet(viewsets.ModelViewSet):
    model = Waypoint
    queryset = Waypoint.objects.all()
    serializer_class = WaypointSerializer

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'trip_set')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'waypoints', WaypointViewSet)
router.register(r'users', UserViewSet)
router.register(r'gasstations', GasStationViewSet)

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'roadtrippr.views.home', name='home'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^logout/','roadtrippr.views.logout_view'),
    url(r'^currentUser/$','roadtrippr.views.user_json'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/rest/', include(router.urls)),
)

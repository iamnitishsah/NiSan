from django.urls import path, include
from .views import PageViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('pages', PageViewSet, basename='page')

urlpatterns = [
    path('', include(router.urls)),
]
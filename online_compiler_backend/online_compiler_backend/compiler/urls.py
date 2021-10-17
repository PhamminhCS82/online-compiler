from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('compiler', views.CodeViewSet, 'compiler')
urlpatterns = [
    path('', include(router.urls)),
]

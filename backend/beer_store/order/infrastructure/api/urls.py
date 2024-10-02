from django.urls import path
from .views import DummyView

urlpatterns = [
    path('hello/', DummyView.as_view(), name='dummy-view'),
]

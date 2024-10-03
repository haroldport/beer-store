from django.urls import path, include

urlpatterns = [
    path('api/orders/', include('beer_store.order.infrastructure.api.urls')),
]

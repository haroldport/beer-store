from django.urls import path, include

urlpatterns = [
    path('api/order/', include('beer_store.order.infrastructure.api.urls')),
    path('api/stock/', include('beer_store.stock.infrastructure.api.urls')),
    path('api/item/', include('beer_store.item.infrastructure.api.urls')),
]

from django.urls import path
from .views import RegisterView, central_view, ProductDetailView, CreateProductView

urlpatterns = [
    path('', central_view, name="oh shit"),
    path('api/users/register/', RegisterView.as_view(), name='register'),
    path('api/products/<uuid:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/products/create/', CreateProductView.as_view(), name='product-create'),
]

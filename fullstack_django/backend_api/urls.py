from django.urls import path
from .views import WishView, RegisterView





urlpatterns = [
    path('',WishView.as_view(), name="oh shit"),
    path('api/users/register/', RegisterView.as_view(), name='register'),

]

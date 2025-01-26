from django.shortcuts import render
from rest_framework.views import APIView
from .models import Product_card
from .serializer import UserSerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

def central_view(request):
    return "Oh hi!"


# class WishView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "title":output.title,
#                 "cost":output.cost
#             } for output in Wish.objects.all()
#         ]
#         return Response(output)
#
#     def post(self, request):
#         serializer = WishSerializer(data = request.data)
#         if serializer.is_valid(raise_exception = True):
#             serializer.save()
#             return Response(serializer.data)


class ProductDetailView(APIView):
    def get(self, request, product_id, format=None):
        try:
            product = Product_card.objects.get(id=product_id)
        except Product_card.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product)
        return Response(serializer.data)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

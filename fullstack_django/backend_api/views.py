from django.shortcuts import render
from rest_framework.views import APIView
from .models import Wish
from .serializer import WishSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class WishView(APIView):
    def get(self, request):
        output = [
            {
                "title":output.title,
                "cost":output.cost
            } for output in Wish.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = WishSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

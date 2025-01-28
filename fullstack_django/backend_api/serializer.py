from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product_card



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


from rest_framework import serializers
from .models import Product_card

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)  # Для обработки изображений
    url = serializers.URLField(required=False)  # Для обработки URL

    class Meta:
        model = Product_card
        fields = ['id', 'name', 'description', 'price', 'image', 'status', 'currency', 'url']


    def create(self, validated_data):
        print("Validated data:", validated_data)
        product = Product_card.objects.create(**validated_data)
        return product
        # return super().create(validated_data)


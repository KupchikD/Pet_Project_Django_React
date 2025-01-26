from django.contrib import admin
from .models import Product_card

# Register your models here.
@admin.register(Product_card)
class ProductCardAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'price', 'status')  # Поля, которые будут видны в списке
    search_fields = ('name',)  # Поля, по которым можно искать
    list_filter = ('status',)  # Фильтры по полям
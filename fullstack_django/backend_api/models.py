from django.db import models
import uuid

# Create your models here.

class Product_card(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('reserved', 'Reserved'),
        ('deleted', 'Deleted'),
    ]

    id = models.UUIDField(
        primary_key= True,
        default= uuid.uuid4(),
        editable= False,
        verbose_name= "Uniq ID"
    )

    name = models.CharField(
        max_length=225,
        verbose_name="name of product",
        null= False,
        blank= False
    )

    description = models.CharField(
        max_length= 1134,
        verbose_name="Description of product",
        null= True,
        blank = True
    )

    url = models.URLField(
        verbose_name= 'Link to the product page',
        null= True,
        blank= True
    )

    price = models.DecimalField(
        max_digits= 10,
        decimal_places= 2,
        verbose_name="price of the product",
        null= True,
        blank= True
    )

    currency = models.CharField(
        max_length= 10,
        verbose_name= "currency of price",
        null= True,
        blank=True
    )

    image = models.ImageField(
        upload_to= 'product_images/',
        verbose_name="picture of product",
        null= True,
        blank= True
    )
    #CODE BELOW CONTAINS RELATION TO WISHLIST TABLE
    # wishlist = models.ForeignKey(
    #     "Wishlist",
    #     on_delete= models.CASCADE,
    #     verbose_name= "Wish list",
    #     related_name="product_cards",
    #     null=False,
    #     blank=False
    # )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='status of product'
    )

    def save(self, *args, **kwargs):
        if self.price is not None and not self.currency:
            raise ValueError("Currency is necessary if price is mentioned")
        super().save(*args, **kwargs)\

    class Meta:
        verbose_name = "Product's card"
        verbose_name_plural = "Product's card's"

    def __str__(self):
        return self.name
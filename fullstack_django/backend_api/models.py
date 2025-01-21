from django.db import models

# Create your models here.

class Wish(models.Model):
    title = models.CharField(max_length=100)
    cost = models.CharField(max_length=100)
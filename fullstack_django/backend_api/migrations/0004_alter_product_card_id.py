# Generated by Django 5.1.5 on 2025-01-28 16:04

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0003_alter_product_card_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product_card',
            name='id',
            field=models.UUIDField(default=uuid.UUID('d0da82d4-f4d5-47f1-b9e4-976a633c12e8'), editable=False, primary_key=True, serialize=False, verbose_name='Uniq ID'),
        ),
    ]

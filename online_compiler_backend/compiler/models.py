from django.contrib.auth.models import AbstractUser
from django.db import models


class Code(models.Model):
    source = models.TextField()
    language = models.CharField(max_length=20)
    input = models.TextField(null=True)


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m', default='users/DefaultAvatar.jpg')
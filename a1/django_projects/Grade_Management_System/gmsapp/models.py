from django.db import models

class StudentsInfo(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    date_of_birth = models.CharField(max_length=100)
    phone_no = models.IntegerField()
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.username

class AdminInfo(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    date_of_birth = models.CharField(max_length=100)
    phone_no = models.IntegerField()
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.username

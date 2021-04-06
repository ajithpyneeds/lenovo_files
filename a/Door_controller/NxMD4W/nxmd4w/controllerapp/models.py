from django.db import models
from django.contrib.auth.models import User
#
# class UserProfile(models.Model):
#     user   = models.OneToOneField(User)
#     userimg = models.ImageField(upload_to='images/')


class Ipsettingsmodel(models.Model):
    ipaddress = models.IntegerField()
    subnet = models.IntegerField()
    gateway = models.IntegerField()
    ippass = models.IntegerField()
    keymanagement = models.CharField(max_length=20)

    # def __str__(self):
    #     return self.ipaddress

class Door1model(models.Model):
    door1name = models.CharField(max_length=50)
    doorsensor = models.BooleanField(default=False)
    lockreleasetime = models.TimeField()
    doormonitoringtime = models.TimeField()
    alarrmtime = models.TimeField()

    # def __str__(self):
    #     return self.door1name

class Door2model(models.Model):
    door2name = models.CharField(max_length=50)
    doorsensor = models.BooleanField(default=False)
    lockreleasetime = models.TimeField()
    doormonitoringtime = models.TimeField()
    alarrmtime = models.TimeField()

    # def __str__(self):
    #     return self.door2name

class Door3model(models.Model):
    door3name = models.CharField(max_length=50)
    doorsensor = models.BooleanField(default=False)
    lockreleasetime = models.TimeField()
    doormonitoringtime = models.TimeField()
    alarrmtime = models.TimeField()

    # def __str__(self):
    #     return self.door3name

class Door4model(models.Model):
    door4name = models.CharField(max_length=50)
    doorsensor = models.BooleanField(default=False)
    lockreleasetime = models.TimeField()
    doormonitoringtime = models.TimeField()
    alarrmtime = models.TimeField()

    # def __str__(self):
    #     return self.door4name

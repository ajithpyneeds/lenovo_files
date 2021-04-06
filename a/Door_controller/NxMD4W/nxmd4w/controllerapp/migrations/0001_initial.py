# Generated by Django 3.0.3 on 2020-02-16 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Door1model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('door1name', models.CharField(max_length=50)),
                ('doorsensor', models.BooleanField(default=False)),
                ('lockreleasetime', models.TimeField()),
                ('doormonitoringtime', models.TimeField()),
                ('alarrmtime', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Door2model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('door2name', models.CharField(max_length=50)),
                ('doorsensor', models.BooleanField(default=False)),
                ('lockreleasetime', models.TimeField()),
                ('doormonitoringtime', models.TimeField()),
                ('alarrmtime', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Door3model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('door3name', models.CharField(max_length=50)),
                ('doorsensor', models.BooleanField(default=False)),
                ('lockreleasetime', models.TimeField()),
                ('doormonitoringtime', models.TimeField()),
                ('alarrmtime', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Door4model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('door4name', models.CharField(max_length=50)),
                ('doorsensor', models.BooleanField(default=False)),
                ('lockreleasetime', models.TimeField()),
                ('doormonitoringtime', models.TimeField()),
                ('alarrmtime', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Ipsettingsmodel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ipaddress', models.IntegerField()),
                ('subnet', models.IntegerField()),
                ('gateway', models.IntegerField()),
                ('ippass', models.IntegerField()),
                ('keymanagement', models.CharField(max_length=20)),
            ],
        ),
    ]
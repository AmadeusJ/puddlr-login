# Generated by Django 2.2.7 on 2019-11-19 05:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('email_login', '0002_demousergroup'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='demousergroup',
            unique_together={('email', 'group')},
        ),
    ]

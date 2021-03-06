# Generated by Django 2.2.7 on 2019-11-19 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('email_login', '0003_alter_unuque_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='demousergroup',
            name='active',
            field=models.BooleanField(default=True, verbose_name='그룹 사용 상태'),
        ),
        migrations.AddField(
            model_name='demousergroup',
            name='status',
            field=models.CharField(default='active', max_length=10, verbose_name='맴버 상태'),
        ),
    ]

from django.db import models

class Test(models.Model):
    '''
    Test - for api request/response test
    '''
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)


class DemoUserGroup(models.Model):
    '''
    Demo - Puddlr login model
    '''
    email = models.CharField(max_length=254, default='None')
    group = models.CharField(max_length=200, default='None')
    server = models.GenericIPAddressField(protocol='both')
    active = models.BooleanField(default=True, verbose_name='그룹 사용 상태')
    status = models.CharField(max_length=10, default='active', verbose_name='맴버 상태')

    def __str__(self):
        return {self.email: {self.group, self.server}}

    class Meta:
        db_table = 'demo_user_group'
        unique_together = (('email', 'group'),)
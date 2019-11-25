from django.urls import path, re_path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_swagger.views import get_swagger_view

import email_login
import email_login.api


router = routers.DefaultRouter()

router.register('test', email_login.api.TestViewSet)
router.register('user', email_login.api.DemoUserViewSet)


urlpatterns = [
    path(r'api-token-auth/', obtain_auth_token),
    path(r'api/doc/', get_swagger_view(title='Puddlr Login API')),
    re_path(r'^$', email_login.index),       # Set as root | Enable react-router working
    path('api/', include(router.urls)),
]

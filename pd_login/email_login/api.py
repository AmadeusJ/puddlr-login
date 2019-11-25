import os
import requests
import json
import logging

from logging.handlers import RotatingFileHandler
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

from .models import (
    Test, DemoUserGroup
)
from .serializers import TestSerializer, DemoUserSerializer
from .crypto import AESCipher


# from django.views.decorators.csrf import ensure_csrf_cookie

LOGFILE = '/home/ubuntu/log/test.log'
MAX_SIZE = 10 * 1024 * 1024
log_handler = RotatingFileHandler(LOGFILE, maxBytes=MAX_SIZE, backupCount=5)
log_handler.setFormatter(logging.Formatter('[%(asctime)s] %(message)s'))
logger = logging.getLogger(__name__)
logger.addHandler(log_handler)

@method_decorator(csrf_protect, name='dispatch')
class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects
    serializer_class = TestSerializer

    # post -> '/api/test'
    def create(self, request):
        return Response({'status': 'success'})

    # post -> '/api/test/pk/regist_user'
    @action(detail=True, methods=['get'])
    def regist_user(self,request, *args, **kwargs):
        print('data: ', request.data)
        return Response({'status': 'success22'})


# @method_decorator(csrf_protect, name='dispatch')
class DemoUserViewSet(viewsets.ModelViewSet):
    queryset = DemoUserGroup.objects
    serializer_class = DemoUserSerializer

    def list(self, request):
        users = self.queryset.all()
        data_for_response = {
            'status': 200,
            'users': DemoUserSerializer(users, many=True).data
        }
        return Response(data_for_response)


    def create(self, request):
        email = self.queryset.create(email=request.data['email'], server=request.data['server'], group=request.data['group'])
        return Response({'status': '200'})


    @action(detail=False, methods=["post"])
    def get_groupset(self, request):
        group = self.queryset.filter(email=request.data['email'])
        response = Response()
        data_for_response = {
            'status': 200,
            'group': DemoUserSerializer(group, many=True).data,
        }
        response.data = data_for_response
        return response
    

    @action(detail=False, methods=['post'])
    def get_saltkey(self, request):

        token_obj = AESCipher().encrypt()
        salt = token_obj['salt'].decode('utf-8')
        token = token_obj['token'].decode('utf-8')
        # iv = token_obj['iv'].decode('utf-8')

        response = Response()
        response.set_cookie(key='salt', value=salt, max_age=1000)
        data_for_response = {
            'status': 200,
            'salt': salt,
            # 'iv': iv,
            'token': token
        }
        response.data = data_for_response

        return response


    # @action(detail=False, methods=['post'])
    # def submit_password(self, request):
    #     # server="http://{ip}:8000".format(ip=request.data['server'])

    #     response = Response()
    #     # response.set_cookie(key='token', value=encrypted_passwd, max_age=1000)

    #     data_for_request = {
    #          'status': 200,
    #     }
    #     res = requests.post(server, json=data_for_request).json()     # post data & store response in 'res'
        
    #     response.data = data_for_request

    #     # if res['status'] == 200:
    #     return response


    # TODO token 발급 후 처리하게 끔 master 계정 추가, class 변경
    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        error_list = []
        for data in request.data:
            res = self.update_or_create(data)

            if not res:
                error_list.append(data)
        if error_list:
            return Response({
                'status': HTTP_500_INTERNAL_SERVER_ERROR,
                'error_data': json.dumps(error_list)
            })
        else:
            return Response({
                'status': HTTP_200_OK
            })

    def update_or_create(self, data):
        try:
            demouser, created = self.queryset.get_or_create(
                email=data['email'], group=data['group'], defaults={'server': '127.0.0.1'}
            )

            demouser.server = data['server']
            demouser.active = True if data['active'] == 'active' else False
            demouser.status = data['status']
            demouser.save()
        except:
            logger.warning('ERROR update_or_create: {data}'.format(data))
            return False
        return True
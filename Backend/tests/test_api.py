from django.test import TestCase, Client
from rest_framework.test import APIClient
from drf_user.models import User

USER_CREDENTIALS = {"username":"testuser", "password":"TestPassword123"}
USER_RELATEDS = {
    "username":"testuser",
    "name":"Test User",
    "password":"TestPassword123",
    "email":"te1st@gmail.com",
    "mobile":"1323456890"
      }
     
REGISTER_URL = "/api/user/register/"
LOGIN_URL = "/api/user/login/"
GET_USER_URL =  "/api/user/account/"
LOGOUT_URL = "/api/user/logout/"

#drf_user
class TestUser(TestCase):

     def test_register(self):
       register_response = self.client.post(REGISTER_URL, USER_RELATEDS)
       self.assertEqual(register_response.status_code, 201)
     
     def test_login(self):
       register_response = self.client.post(REGISTER_URL, USER_RELATEDS)
       login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
       self.assertEqual(login_response.status_code, 200)
     
     def test_get_user_details(self):
       self.client.post(REGISTER_URL, USER_RELATEDS)
       login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
       auth = "Bearer {}".format(login_response.data['token'])
       user_response_details = self.client.get(GET_USER_URL, HTTP_AUTHORIZATION=auth)

       self.assertEqual(user_response_details.status_code, 200)
       self.assertEqual(user_response_details.data['username'], 'testuser')

     def test_logout(self):
       self.client.post(REGISTER_URL, USER_RELATEDS)
       login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
       auth = "Bearer {}".format(login_response.data['token'])
       logout_response = self.client.get(LOGOUT_URL, HTTP_AUTHORIZATION=auth)

       self.assertEqual(logout_response.status_code, 200)
       self.assertEqual(logout_response.data['user'][0], 'Logout successfully.')

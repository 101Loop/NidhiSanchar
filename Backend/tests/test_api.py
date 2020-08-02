from django.test import TestCase
from mixer.backend.django import mixer

from drf_user.models import User
from department.models import DepartmentName, CentreDepartment, StateDepartment
from department.serializers import CentreDepartmentSerializer, StateDepartmentSerializer

from schemes.models import Scheme

USER_CREDENTIALS = {"username":"testuser", "password":"TestPassword123"}
USER_RELATEDS = {
    "username":"testuser",
    "name":"Test User",
    "password":"TestPassword123",
    "email":"te1st@gmail.com",
    "mobile":"1323456890"
      }
DUMMY_SCHEME ={
  "name":"string",
  "scheme_code":"string",
  "date_of_launching":"2020-08-02",
  "description":"string",
  "slug":"string",
  "scheme_budget":"4",
  "created_by":""
}   
REGISTER_URL = "/api/user/register/"
LOGIN_URL = "/api/user/login/"
GET_USER_URL =  "/api/user/account/"
LOGOUT_URL = "/api/user/logout/"
GET_CENTRE_DEPARTMENT_URL = '/api/department/v1/center-department/'
GET_STATE_DEPARTMENT_URL = '/api/department/v1/state-department/'
CREATE_SCHEME_URL = '/api/schemes/v1/create-schemes/'

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

#department
class TestCentralDepartment(TestCase):

    def setUp(self):
        self.poc = User.objects.create_user(
            username="testuser",
            name="Test User",
            password="TestPassword123",
            email="test@gmail.com",
            mobile="1234567890",
        )
        self.dept_name = DepartmentName.objects.create(name="Test Department")
        self.centre_dept = CentreDepartment.objects.create(
            dept_name=self.dept_name,
            dept_poc=self.poc,
            about="testing",
        )

    def test_get_dept_details(self):
        login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
        auth = "Bearer {}".format(login_response.data['token'])
        response = self.client.get(GET_CENTRE_DEPARTMENT_URL, HTTP_AUTHORIZATION=auth)
        
        department = CentreDepartment.objects.get(dept_name=self.dept_name)
        serializer = CentreDepartmentSerializer(department)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['dept_name'], serializer.data['dept_name'])

class TestStateDepartment(TestCase):

    def setUp(self):
        self.poc = User.objects.create_user(
            username="testuser",
            name="Test User",
            password="TestPassword123",
            email="test@gmail.com",
            mobile="1234567890",
        )
        self.dept_name = DepartmentName.objects.create(name="Test Department")
        self.centre_dept = StateDepartment.objects.create(
            state='Uttar Pradesh',
            dept_name=self.dept_name,
            dept_poc=self.poc,
            about="testing",
        )

    def test_get_dept_details(self):
        login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
        auth = "Bearer {}".format(login_response.data['token'])
        response = self.client.get(GET_STATE_DEPARTMENT_URL, HTTP_AUTHORIZATION=auth)
        
        department = StateDepartment.objects.get(dept_name=self.dept_name)
        serializer = StateDepartmentSerializer(department)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['dept_name'], serializer.data['dept_name'])


class TestSchemes(TestCase):

    def setUp(self):
        self.poc = User.objects.create_user(
            username="testuser",
            name="Test User",
            password="TestPassword123",
            email="test@gmail.com",
            mobile="1234567890",
        )
        self.dept_name = DepartmentName.objects.create(name="Test Department")
        self.centre_dept = CentreDepartment.objects.create(
            dept_name=self.dept_name,
            dept_poc=self.poc,
            about="testing",
        )
        
    def test_create_scheme(self):
        department = CentreDepartment.objects.get(dept_name=self.dept_name)
        serializer = CentreDepartmentSerializer(department)
        DUMMY_SCHEME['created_by'] = serializer.data

        login_response = self.client.post(LOGIN_URL, USER_CREDENTIALS)
        auth = "Bearer {}".format(login_response.data['token'])
        response = self.client.post(CREATE_SCHEME_URL, DUMMY_SCHEME, HTTP_AUTHORIZATION=auth)

        self.assertEqual(response.status_code, 201)
    #To check schemes can be created simuntanously by same department
'''
        DUMMY_SCHEME['name'] = "Happy Scheme"
        response = self.client.post(CREATE_SCHEME_URL, DUMMY_SCHEME, HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 201)
'''
from django.test import TestCase
from mixer.backend.django import mixer

from drf_user.models import User, AuthTransaction, OTPValidation
from department.models import CentreDepartment, StateDepartment, DepartmentName


# drf user
class TestUser(TestCase):
    """User Model"""

    def setUp(self):
        self.user = mixer.blend(User, name="Test User", username="testuser")

    def test_get_full_name(self):
        user = User.objects.last()
        name = user.get_full_name()
        self.assertEqual(name, "Test User")

    def test_str(self):
        user = User.objects.last()
        self.assertEqual(str(user), "Test User | testuser")


class TestAuthTransaction(TestCase):
    """AuthTransaction Model"""

    def setUp(self):
        self.auth_transaction = mixer.blend(
            AuthTransaction,
            created_by__name="sumit",
            created_by__username="root",
            ip_address="192.168.1.1",
        )

    def test_str(self):
        auth_transaction = AuthTransaction.objects.get(ip_address="192.168.1.1")
        self.assertEqual(str(auth_transaction), "sumit | root")


class TestOTPValidation(TestCase):
    """OTPValidation Model"""

    def setUp(self):
        self.otp_validation = mixer.blend(OTPValidation, destination="mobile")

    def test_str(self):
        otp = OTPValidation.objects.get(destination="mobile")
        self.assertEqual(str(otp), "mobile")

###########
#department
###########
class TestCentreDepartment(TestCase):
    """CentreDepartment Model"""

    def setUp(self):
        self.poc = mixer.blend(
            User,
            username="testuser",
            name="Test User",
            password="TestPassword123",
            email="test@gmail.com",
            mobile="1234567890",
        )
        self.deptname = mixer.blend(DepartmentName, name='Test CentreDepartment')
        self.centre_dept = mixer.blend(
            CentreDepartment,
            dept_name=self.deptname,
            dept_about="This is a CentreDepartment to test the functionalities of the CentreDepartment Model""",
            dept_poc=self.poc,
        )

    def test_department_created(self):
        """Checks department is created succesfully"""

        centre_dept = CentreDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(centre_dept.dept_name.name, "Test CentreDepartment")
    
    def test_department_has_poc(self):
        """Checks that department has a point of contact"""
        
        centre_dept = CentreDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(centre_dept.dept_poc.name, "Test User")
    
    def test_str(self):
        centre_dept = CentreDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(str(centre_dept), "CENTRE-Test CentreDepartment")

class TestStateDepartment(TestCase):
    """StateDepartment Model"""

    def setUp(self):
        self.poc = mixer.blend(
            User,
            username="testuser",
            name="Test User",
            password="TestPassword123",
            email="test@gmail.com",
            mobile="1234567890",
        )
        self.deptname = mixer.blend(DepartmentName, name='Test StateDepartment')
        self.state_dept = mixer.blend(
            StateDepartment,
            state="Uttar Pradesh",
            dept_name=self.deptname,
            dept_about="This is a StateDepartment to test the functionalities of the StateDepartment Model""",
            dept_poc=self.poc,
        )

    def test_department_created(self):
        """Checks department is created succesfully"""

        state_dept = StateDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(state_dept.dept_name.name, "Test StateDepartment")
    
    def test_department_has_poc(self):
        """Checks that department has a point of contact"""
        
        state_dept = StateDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(state_dept.dept_poc.name, "Test User")
    
    def test_str(self):
        state_dept = StateDepartment.objects.get(dept_name=self.deptname)
        self.assertEqual(str(state_dept), "Uttar Pradesh-Test StateDepartment")

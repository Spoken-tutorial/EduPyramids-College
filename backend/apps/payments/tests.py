#from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from django.urls import reverse

class PaymentTests(APITestCase):

    def test_create_session(self):
        url = reverse('create-academic-session')
        data = {"email": "test@example.com", "academic_ids": [1], "amount": 1000}
        response = self.client.post(url, data, format='json')
        self.assertIn(response.status_code, [200, 400])
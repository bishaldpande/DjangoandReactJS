from django.shortcuts import render

def home(request):
	return render(request,'home.html')

from myapp.serializers import CustomerSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from myapp.models import Customer


class CustomerList(APIView):
	renderer_classes = (JSONRenderer,)
	def get(self, request, format=None):
		customer = Customer.objects.all()
		serializer = CustomerSerializer(customer, many=True)
		json = JSONRenderer().render(serializer.data)
		return Response(json)
	def post(self, request, format=None):
		serializer = CustomerSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response('SUCCESS')

		return Response('ERROR')


# from django.http import Http404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from myapp.serializers import CustomerSerializer

# # Create your views here.

# class CustomerList(APIView):
# 	permission_classes = (IsAuthenticatedOrReadOnly,)

# 	def get(self, request, format=None):
# 		products = Product.objects.all()
# 		serializer = CustomerSerializer(products, many=True)
# 		return Response(serializer.data)

# 	def post(self, request, format=None):
# 		serializer = CustomerSerializer(data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
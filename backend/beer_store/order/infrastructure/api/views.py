from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class DummyView(APIView):
    def get(self, request):
        return Response({"message": "Hello from Beer Store!"}, status=status.HTTP_200_OK)

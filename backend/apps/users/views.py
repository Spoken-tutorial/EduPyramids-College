from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import CustomTokenObtainPairSerializer

# Create your views here.
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        res = super().post(request, *args, **kwargs)
        # set refresh token as httpOnly cookie; keep access in response body
        refresh = res.data.get("refresh")
        if refresh:
            res.set_cookie(
                key="refresh",
                value=refresh,
                httponly=True,
                secure=False, # True in production (HTTPS)
                samesite="Lax",
                path="/api/auth/",
                max_age=7*24*3600,
            )
            del res.data["refresh"]
        return res

class RefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # read refresh from cookie
        request.data["refresh"] = request.COOKIES.get("refresh")
        return super().post(request, *args, **kwargs)
    

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        u = request.user
        return Response({
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "roles": list(u.groups.values_list("name", flat=True)),
        })

class LogoutView(APIView):
    def post(self, request):
        res = Response({"ok": True})
        res.delete_cookie("refresh", path="/api/auth/")
        return res
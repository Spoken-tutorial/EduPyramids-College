from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.spoken.models import CreationDomain, CreationTutorialresource, CreationLanguage
from .serializers import DomainsPageSerializer


class DomainCourseView(APIView):
    def get(self, request):
        qs = CreationDomain.objects.filter(is_active=1).only('id', 'name', 'icon', 'description')
        ser = DomainsPageSerializer(qs, many=True)
        return Response({"domains": ser.data})
    

class TutorialSearchView(APIView):
    def get(self, request):
        data = {"x": "xyz"}
        search_foss = self.request.GET.get("search_foss", "")
        search_language = self.request.GET.get("search_language", "")
        search_domain = self.request.GET.get("search_domain","")
        queryset = CreationTutorialresource.objects.filter(Q(status=1) | Q(status=2), tutorial_detail__foss__show_on_homepage = 1)


        if search_foss and search_language:
            collection = queryset.filter(tutorial_detail__foss__foss=search_foss, language__name=search_language).order_by('tutorial_detail__level', 'tutorial_detail__order')

        language_id = CreationLanguage.objects.filter(name=search_language)
        tr = CreationTutorialresource.objects.filter(tutorial_detail__foss__name=search_foss, language_id=language_id)
        return Response(data)
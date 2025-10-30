from django.shortcuts import render
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

from apps.spoken.models import CreationDomain, CreationTutorialresource, CreationLanguage, CreationFosscategory, CreationFosscategoryDomain
from .serializers import DomainsPageSerializer, TutorialListSerializer, CourseListSerializer

# pagination -----------------------------------------
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    # page_size_query_param = 'page'
    # max_page_size = 100


class DomainCourseView(APIView):
    def get(self, request):
        qs = CreationDomain.objects.filter(is_active=1).only('id', 'name', 'icon', 'description')
        ser = DomainsPageSerializer(qs, many=True)
        return Response({"domains": ser.data})
    

class TutorialSearchView(generics.ListAPIView):
    serializer_class = TutorialListSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        request = self.request
        search_foss = request.GET.get("search_foss", "")
        search_language = request.GET.get("search_language", "")
        search_domain = request.GET.get("search_domain","")

        qs = (
            CreationTutorialresource.objects
            .filter(Q(status=1) | Q(status=2), tutorial_detail__foss__show_on_homepage=1)
            .select_related('tutorial_detail', 'tutorial_detail__foss', 'tutorial_detail__level')
            .order_by('tutorial_detail__level', 'tutorial_detail__order')
        )

        if search_foss:
            qs = qs.filter(tutorial_detail__foss__foss=search_foss)
        if search_language:
            qs = qs.filter(language__name=search_language)
        if search_domain:
            qs = qs.filter(tutorial_detail__foss__domain__name=search_domain)
        
        return qs

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        paginated = response.data
        # Add optional extra info
        extra = {}
        search_foss = request.GET.get("search_foss", "")
        if search_foss:
            try:
                foss = CreationFosscategory.objects.get(foss=search_foss)
                extra = {"foss": foss.foss, "description": foss.description}
            except CreationFosscategory.DoesNotExist:
                extra = {"foss": search_foss, "description": None}
        response.data = {
            **extra,
            "page_size": self.pagination_class.page_size,
            "count": paginated.get("count"),
            "next": paginated.get("next"),
            "previous": paginated.get("previous"),
            "tutorials": paginated.get("results", []),
        }
        return response



# class TutorialSearchView(APIView):
#     def get(self, request):
#         data = {"x": "xyz"}
#         search_foss = self.request.GET.get("search_foss", "")
#         search_language = self.request.GET.get("search_language", "")
#         search_domain = self.request.GET.get("search_domain","")
#         queryset = CreationTutorialresource.objects.filter(Q(status=1) | Q(status=2), tutorial_detail__foss__show_on_homepage = 1)
#         if search_foss and search_language:
#             print(f"\033[95m search_foss ******** {search_foss} \033[0m")
#             foss = CreationFosscategory.objects.get(foss=search_foss)
#             qs = queryset.filter(tutorial_detail__foss__foss=search_foss, language__name=search_language
#                                          ).select_related('tutorial_detail', 'tutorial_detail__foss', 'tutorial_detail__level').order_by('tutorial_detail__level', 'tutorial_detail__order')
#             print(f"\033[95m collection ****** {len(qs)} \033[0m")
#             ser = TutorialListSerializer(qs, many=True)
#             print(f"\033[92m serialzier data \033[0m")
#             response = {
#                 "foss": foss.foss,
#                 "description": foss.description,
#                 "tutorials": ser.data
#             }
#         return Response(response)
    
class CourseSearchView(APIView):
    def get(self, request):
        data = {"x": "xyz"}
        search_domain = self.request.GET.get('search_domain', '')
        search_language = self.request.GET.get('search_language', '')
        print(f"\033[92m search_domain \033[0m")
        print(search_domain)
        print(f"\033[92m search_language \033[0m")
        print(search_language)
        domain = CreationDomain.objects.get(name=search_domain)
        fosses = CreationFosscategoryDomain.objects.filter(domain__name=search_domain).values('fosscategory_id')
        foss_ids = CreationTutorialresource.objects.filter(tutorial_detail__foss__id__in=fosses, language__name=search_language).values('tutorial_detail__foss__id').distinct()
        fosses = CreationFosscategory.objects.filter(id__in=foss_ids)
        ser = CourseListSerializer(fosses, many=True)
        print(f"\033[92m fosses \033[0m")
        print(foss_ids)
        data = {
            "domain": domain.name,
            "description": domain.description,
            "fosses": ser.data
        }
        return Response(data)
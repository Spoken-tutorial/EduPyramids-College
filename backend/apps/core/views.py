# backend/apps/core/views.py
from django.http import JsonResponse
from django.db.models import Prefetch, Q
from django.utils.text import slugify
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import defaultdict
from apps.spoken.models import *
from apps.spoken.serializers import DomainSerializer

from apps.cms.models import CarouselItem
from apps.cms.serializers import CarouselItemSerializer


def health(request):
    return JsonResponse({"status": "ok"})


class HomepageView(APIView):
    def get(self, request):
        qs = (
        CreationDomain.objects
        .filter(show_on_homepage=1)
        .only('name', 'icon')
        .prefetch_related(
            Prefetch(
                'fosscategories',
                queryset=(
                    CreationFosscategory.objects
                    .only('foss', 'icon')
                    .order_by('foss')
                )
            )
        )
        .order_by('name')
      )
        ser = DomainSerializer(qs, many=True)
      # carousel
        now = timezone.now()
        c = CarouselItem.objects.filter(carousel="Homepage", is_active=True).filter(Q(starts_at__isnull=True) | Q(starts_at__lte=now),
                Q(ends_at__isnull=True) | Q(ends_at__gte=now),
                ).order_by("sort_order")
        carousel = CarouselItemSerializer(c, many=True, context={"request": request}).data

        response = {
          "carousel": carousel,
          "catalogue": ser.data,
        }
        return Response(response)


class HPFiltersView(APIView):
    def get(self, request):
        # --- Domains ---
        domain_qs = CreationDomain.objects.filter(is_active=1).values("id", "name")
        domains = [
            {"id": d["id"], "name": d["name"], "slug": slugify(d["name"]) }
            for d in domain_qs
        ]

        # --- Languages ---
        language_qs = CreationLanguage.objects.all().values("id", "name")
        languages = list(language_qs)

        # --- Foss ---
        foss_qs = CreationFosscategory.objects.filter(show_on_homepage=1).values("id", "foss")
        foss_map = {f["id"]: f["foss"] for f in foss_qs}

        # Get languageIds per foss (via Tutorialdetail + Tutorialresource)
        foss_lang_map = defaultdict(set)
        tr_qs = (
            CreationTutorialresource.objects
            .select_related(None) ## avoid fetching FKs
            .values("tutorial_detail__foss_id", "language_id")
            .distinct()
        )
        for tr in tr_qs:
            foss_lang_map[tr["tutorial_detail__foss_id"]].add(tr["language_id"])

        foss = [
            {
                "id": f_id,
                "name": name, 
                "slug": slugify(name),
                "languageIds": sorted(foss_lang_map.get(f_id, set()))
            }
            for f_id, name in foss_map.items()
        ]

        # --- DomainFoss ---
        df_qs = CreationFosscategoryDomain.objects.values("domain_id", "fosscategory_id", "is_primary")
        domainFoss = [
            {
                "domainId": df["domain_id"],
                "fossId": df["fosscategory_id"],
                "primary": df["is_primary"],
            }
            for df in df_qs

        ]

        # final filter data
        response = {
              "domains": domains,
              "foss": foss,
              "languages": languages,
              "domainFoss": domainFoss
        }

        return Response(response)

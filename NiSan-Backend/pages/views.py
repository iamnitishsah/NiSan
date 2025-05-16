from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Page
from .serializers import PageSerializer

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']
    ordering = ['-created_at']
    ordering_fields = ['created_at', 'updated_at', 'title']

    def get_queryset(self):
        return self.queryset.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

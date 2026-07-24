from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated  # <-- Importas esto
from .models import Producto
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]  # <-- Agregas esta línea aquí adentro
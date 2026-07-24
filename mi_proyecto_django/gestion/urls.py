from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .api_views import ProductoViewSet

router = DefaultRouter()
router.register(r'api/productos', ProductoViewSet, basename='api-producto')

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('productos/', views.lista_productos, name='lista_productos'),
    path('productos/<int:id>/', views.detalle_producto, name='detalle_producto'),
    path('productos/nuevo/', views.crear_producto, name='crear_producto'),
    path('productos/<int:id>/editar/', views.editar_producto, name='editar_producto'),
    path('productos/<int:id>/eliminar/', views.eliminar_producto, name='eliminar_producto'),
    path('', include(router.urls)),
]
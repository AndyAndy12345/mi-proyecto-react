from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('gestion.urls')), # Esto conecta las rutas públicas de tu app
    path('api-auth/', include('rest_framework.urls')), # <-- ESTA LÍNEA AGREGA EL LOGIN Y LOGOUT
]
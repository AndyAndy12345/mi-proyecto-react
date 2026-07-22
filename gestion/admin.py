from django.contrib import admin
from .models import Categoria, Cliente, Producto

# Configuración personalizada para el modelo Categoria
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion') # Columnas a mostrar
    search_fields = ('nombre',)                    # Habilita el buscador por nombre

# Configuración personalizada para el modelo Cliente
@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'correo', 'fecha_registro')
    search_fields = ('nombre', 'correo')
    list_filter = ('fecha_registro',)             # Habilita filtro lateral por fecha

# Configuración personalizada para el modelo Producto
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'stock', 'precio', 'categoria')
    search_fields = ('nombre',)
    list_filter = ('categoria',)                  # Habilita filtro por categoría
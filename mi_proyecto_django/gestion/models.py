from django.db import models

# =====================================================================
# TABLA 1: CATEGORÍAS DE PRODUCTOS
# =====================================================================
class Categoria(models.Model):
    # CharField con longitud máxima definida (max_length=100)
    nombre = models.CharField(max_length=100, verbose_name="Nombre de la Categoría")
    
    # Campo opcional (puede quedar vacío en la base de datos)
    descripcion = models.CharField(max_length=250, null=True, blank=True, verbose_name="Descripción")

    # Método __str__() obligatorio para mostrar el nombre real en el panel
    def __str__(self):
        return self.nombre


# =====================================================================
# TABLA 2: CLIENTES
# =====================================================================
class Cliente(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre Completo")
    
    # EmailField para validar correos electrónicos
    correo = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    
    # DateField que se llena automáticamente con la fecha del día de hoy
    fecha_registro = models.DateField(auto_now_add=True, verbose_name="Fecha de Registro")

    def __str__(self):
        return self.nombre


# =====================================================================
# TABLA 3: PRODUCTOS
# =====================================================================
class Producto(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre del Producto")
    
    # IntegerField con un valor predeterminado (default=0)
    stock = models.IntegerField(default=0, verbose_name="Cantidad en Inventario")
    
    # DecimalField ideal para precios y dinero
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    
    # ForeignKey crea la relación entre Producto y Categoría
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, verbose_name="Categoría")

    def __str__(self):
        return self.nombre
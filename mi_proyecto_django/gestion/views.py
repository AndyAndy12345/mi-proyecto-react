from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Producto
from .forms import ProductoForm

# 1. LEER: Inicio
def inicio(request):
    return render(request, 'gestion/inicio.html')

# 2. LEER: Lista de Productos
def lista_productos(request):
    productos = Producto.objects.all()
    return render(request, 'gestion/lista_productos.html', {'productos': productos})

# 3. LEER: Detalle de un Producto
def detalle_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    return render(request, 'gestion/detalle_producto.html', {'producto': producto})

# 4. CREAR: Formulario de Alta
def crear_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Producto registrado exitosamente!')
            return redirect('lista_productos')
        else:
            messages.error(request, 'Hubo un error en las validaciones del formulario.')
    else:
        form = ProductoForm()
    return render(request, 'gestion/form_producto.html', {'form': form, 'titulo': 'Dar de Alta Producto'})

# 5. ACTUALIZAR: Formulario de Modificación
def editar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Producto actualizado exitosamente!')
            return redirect('lista_productos')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'gestion/form_producto.html', {'form': form, 'titulo': 'Modificar Producto'})

# 6. BORRAR: Confirmación de Eliminación
def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    if request.method == 'POST':
        producto.delete()
        messages.success(request, '¡Producto eliminado permanentemente!')
        return redirect('lista_productos')
    return render(request, 'gestion/confirmar_eliminar.html', {'producto': producto})
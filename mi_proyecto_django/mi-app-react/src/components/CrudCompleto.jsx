import { useState, useEffect, useCallback } from 'react';
import TablaProyectos from './TablaProyectos';

export default function CrudCompleto() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

  // Estados Formulario
  const [idEditando, setIdEditando] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  // Estado para la confirmación de eliminación (Punto 2)
  const [proyectoAEliminar, setProyectoAEliminar] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  const cargarProyectos = async () => {
    try {
      const resp = await fetch(`${API_URL}?_limit=4`);
      const data = await resp.json();
      setProyectos(data);
    } catch (err) {
      mostrarAlerta('danger', 'Error al conectar con la API.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ tipo, mensaje });
    setTimeout(() => setAlerta({ tipo: '', mensaje: '' }), 4000);
  };

  // Guardar (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !contenido) return;

    try {
      if (idEditando) {
        const resp = await fetch(`${API_URL}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idEditando, title: titulo, body: contenido })
        });
        const dataEditada = await resp.json();
        setProyectos(proyectos.map(p => p.id === idEditando ? dataEditada : p));
        mostrarAlerta('success', '✅ ¡Registro modificado vía PUT!');
      } else {
        const resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: titulo, body: contenido })
        });
        const nuevoData = await resp.json();
        setProyectos([nuevoData, ...proyectos]);
        mostrarAlerta('success', '✅ ¡Registro creado vía POST!');
      }
      cancelarEdicion();
    } catch (err) {
      mostrarAlerta('danger', '⚠️ Error al procesar la solicitud.');
    }
  };

  // 2 y 3. Solicitud DELETE con confirmación previa
  const ejecutarEliminacion = async () => {
    if (!proyectoAEliminar) return;

    try {
      // 3. Enviar la solicitud DELETE
      const resp = await fetch(`${API_URL}/${proyectoAEliminar.id}`, {
        method: 'DELETE'
      });

      if (!resp.ok) throw new Error('No se pudo eliminar');

      // 4. Actualizar el listado en el estado
      setProyectos(proyectos.filter(p => p.id !== proyectoAEliminar.id));
      mostrarAlerta('success', `🗑️ Registro #${proyectoAEliminar.id} eliminado correctamente (DELETE).`);
    } catch (err) {
      mostrarAlerta('danger', '⚠️ Error al eliminar el registro.');
    } finally {
      setProyectoAEliminar(null); // Cerrar confirmación
    }
  };

  // useCallback previene recreación inútil de funciones al renderizar (Punto 5)
  const prepararEdicion = useCallback((proyecto) => {
    setIdEditando(proyecto.id);
    setTitulo(proyecto.title);
    setContenido(proyecto.body);
  }, []);

  const cancelarEdicion = () => {
    setIdEditando(null);
    setTitulo('');
    setContenido('');
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0 p-4">
        <h2 className="text-primary fw-bold mb-1">(Sesión 7) Actividad 3</h2>
        <h4 className="text-secondary mb-4">🚀 CRUD Completo: Eliminación y Optimización</h4>

        {/* ALERTAS */}
        {alerta.mensaje && (
          <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
            {alerta.mensaje}
          </div>
        )}

        {/* 2. SOLICITAR CONFIRMACIÓN ANTES DE EJECUTAR LA OPERACIÓN */}
        {proyectoAEliminar && (
          <div className="alert alert-warning border-warning p-3 mb-4 shadow-sm" role="alert">
            <h5 className="fw-bold">⚠️ ¿Confirmas eliminar este registro?</h5>
            <p className="mb-2">Vas a borrar el proyecto: <strong>"{proyectoAEliminar.title}"</strong> (ID: {proyectoAEliminar.id}).</p>
            <div>
              <button className="btn btn-danger btn-sm me-2 fw-bold" onClick={ejecutarEliminacion}>
                Sí, Eliminar (DELETE)
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setProyectoAEliminar(null)}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="row g-4">
          {/* FORMULARIO */}
          <div className="col-12 col-md-5">
            <div className="card p-3 border shadow-sm">
              <h5 className="fw-bold mb-3">
                {idEditando ? '✏️ Editar Registro' : '➕ Alta de Registro'}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Título *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título del proyecto"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder="Descripción..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className={`btn ${idEditando ? 'btn-warning' : 'btn-primary'} w-100 fw-bold`}>
                  {idEditando ? '💾 Guardar Cambios' : '📤 Registrar'}
                </button>
                {idEditando && (
                  <button type="button" className="btn btn-secondary w-100 mt-2" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* TABLA MODULARIZADA */}
          <div className="col-12 col-md-7">
            <div className="card p-3 border shadow-sm">
              <h5 className="fw-bold mb-3">📋 Listado de Registros (CRUD)</h5>
              {/* 6. Componente separado TablaProyectos */}
              <TablaProyectos
                proyectos={proyectos}
                prepararEdicion={prepararEdicion}
                confirmarEliminacion={(p) => setProyectoAEliminar(p)}
                cargando={cargando}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
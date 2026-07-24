import { useState, useEffect } from 'react';

export default function GestionApi() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

  // Estados del Formulario (Crear / Editar)
  const [idEditando, setIdEditando] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  // 1. Cargar listado inicial (GET)
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

  // 2, 6 y 7. Guardar o Modificar (POST / PUT) + Validación de Errores
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !contenido) return;

    try {
      if (idEditando) {
        // --- OPERACIÓN PUT (Modificación) ---
        const resp = await fetch(`${API_URL}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idEditando, title: titulo, body: contenido })
        });

        if (!resp.ok) throw new Error('Error del backend al actualizar.');

        const dataEditada = await resp.json();

        // 4. Actualizar automáticamente el listado
        setProyectos(proyectos.map(p => p.id === idEditando ? dataEditada : p));
        mostrarAlerta('success', '✅ ¡Proyecto modificado correctamente vía PUT!');
      } else {
        // --- OPERACIÓN POST (Registro Nuevo) ---
        const resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: titulo, body: contenido })
        });

        if (!resp.ok) throw new Error('Error del backend al guardar.');

        const nuevoData = await resp.json();

        // 4. Actualizar automáticamente el listado
        setProyectos([nuevoData, ...proyectos]);
        mostrarAlerta('success', '✅ ¡Proyecto registrado exitosamente vía POST!');
      }

      // Limpiar formulario
      cancelarEdicion();
    } catch (err) {
      // 7. Validar errores procedentes del backend
      mostrarAlerta('danger', `⚠️ ${err.message}`);
    }
  };

  // 5. Cargar datos en el formulario para Editar
  const prepararEdicion = (proyecto) => {
    setIdEditando(proyecto.id);
    setTitulo(proyecto.title);
    setContenido(proyecto.body);
  };

  const cancelarEdicion = () => {
    setIdEditando(null);
    setTitulo('');
    setContenido('');
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0 p-4">
        <h2 className="text-primary fw-bold mb-1">(Sesión 7) Actividad 2</h2>
        <h4 className="text-secondary mb-4">⚙️ Registro y Modificación (POST / PUT)</h4>

        {/* 3 y 7. ALERTAS DE CONFIRMACIÓN Y ERROR */}
        {alerta.mensaje && (
          <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
            {alerta.mensaje}
          </div>
        )}

        <div className="row g-4">
          {/* FORMULARIO */}
          <div className="col-12 col-md-5">
            <div className="card p-3 border shadow-sm">
              <h5 className="fw-bold mb-3">
                {idEditando ? '✏️ Modificar Registro' : '➕ Nuevo Registro'}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Título del Proyecto *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej. API en Django"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción / Contenido *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder="Detalles del proyecto..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className={`btn ${idEditando ? 'btn-warning' : 'btn-primary'} w-100 fw-bold`}>
                  {idEditando ? '💾 Guardar Cambios (PUT)' : '📤 Registrar (POST)'}
                </button>
                {idEditando && (
                  <button type="button" className="btn btn-secondary w-100 mt-2" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* TABLA DE REGISTROS */}
          <div className="col-12 col-md-7">
            <div className="card p-3 border shadow-sm">
              <h5 className="fw-bold mb-3">📋 Listado Actualizado</h5>
              {cargando ? (
                <div className="text-center py-3">⏳ Cargando registros...</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle border">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th className="text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectos.map((p) => (
                        <tr key={p.id}>
                          <td className="fw-bold">{p.id}</td>
                          <td className="text-capitalize">{p.title}</td>
                          <td className="text-center">
                            {/* 5. OPCIÓN PARA EDITAR */}
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => prepararEdicion(p)}
                            >
                              ✏️ Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
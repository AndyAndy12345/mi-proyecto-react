import { useState } from 'react';

export default function IntegracionFinal() {
  // 1. Datos temporales iniciales
  const [proyectos, setProyectos] = useState([
    { id: 1, nombre: 'API REST Django', categoria: 'Desarrollo Backend', fecha: '2026-07-01', estado: 'Activo' },
    { id: 2, nombre: 'Frontend React SPA', categoria: 'Desarrollo Web', fecha: '2026-07-15', estado: 'En Proceso' }
  ]);

  // Estados del formulario controlado
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);

  // 2. Manejo de envío e integración de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !categoria) return;

    const nuevoProyecto = {
      id: Date.now(),
      nombre,
      categoria,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    };

    // Actualiza la tabla insertando el nuevo registro
    setProyectos([...proyectos, nuevoProyecto]);
    
    // Limpieza de campos y notificación
    setNombre('');
    setCategoria('');
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000);
  };

  // Botón de acción: Eliminar registro
  const handleEliminar = (id) => {
    setProyectos(proyectos.filter(p => p.id !== id));
  };

  return (
    <div className="container my-4">
      {/* ENCABEZADO */}
      <header className="bg-dark text-white p-4 rounded-3 text-center mb-4 shadow-sm">
        <h1 className="fw-bold fs-3">🚀 Sistema Integrado de Gestión de Proyectos</h1>
        <p className="text-light mb-0 small">Módulo Frontend Integrado - Sesión 6 (React & Bootstrap)</p>
      </header>

      {/* ALERTA DINÁMICA */}
      {mensajeExito && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✅ <strong>¡Registro Exitoso!</strong> El proyecto fue transferido correctamente a la tabla.
        </div>
      )}

      {/* GRID RESPONSIVO (Formulario + Tabla) */}
      <div className="row g-4">
        
        {/* FORMULARIO */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 h-100 p-3">
            <h3 className="card-title fs-5 text-primary mb-3">📝 Nuevo Proyecto</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre del Proyecto *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. App Banco" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Categoría *</label>
                <select 
                  className="form-select" 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Desarrollo Backend">Desarrollo Backend</option>
                  <option value="Móvil">Móvil</option>
                </select>
              </div>

              {/* BOTÓN DE ACCIÓN: GUARDAR */}
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                ➕ Agregar a la Tabla
              </button>
            </form>
          </div>
        </div>

        {/* TABLA DE REGISTROS */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 h-100 p-3">
            <h3 className="card-title fs-5 text-secondary mb-3">📋 Registros Activos ({proyectos.length})</h3>
            
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-dark">
                  <tr>
                    <th>Proyecto</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-3">No hay proyectos registrados.</td>
                    </tr>
                  ) : (
                    proyectos.map((p) => (
                      <tr key={p.id}>
                        <td className="fw-semibold">{p.nombre}</td>
                        <td><span className="badge bg-secondary">{p.categoria}</span></td>
                        <td><span className="badge bg-success">{p.estado}</span></td>
                        <td className="text-center">
                          {/* BOTÓN DE ACCIÓN: ELIMINAR */}
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleEliminar(p.id)}
                            title="Eliminar Registro"
                          >
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
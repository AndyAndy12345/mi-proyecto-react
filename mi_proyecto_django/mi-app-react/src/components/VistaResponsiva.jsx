import { useState } from 'react';

export default function VistaResponsiva() {
  const [alerta, setAlerta] = useState(false);

  return (
    <div className="container my-4">
      {/* Alerta */}
      {alerta && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✅ ¡Formulario procesado correctamente con grid responsivo de Bootstrap!
          <button type="button" className="btn-close" onClick={() => setAlerta(false)}></button>
        </div>
      )}

      {/* Encabezado */}
      <div className="row text-center mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-primary">(Sesión 6) Actividad 4</h2>
          <p className="text-muted">Diseño Responsivo adaptado a Escritorio, Tableta y Teléfono</p>
        </div>
      </div>

      {/* Grid: Formulario y Tabla en Filas/Columnas */}
      <div className="row g-4">
        
        {/* Columna 1: Formulario */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 p-3">
            <h4 className="card-title text-secondary mb-3">📝 Registro de Proyecto</h4>
            <form onSubmit={(e) => { e.preventDefault(); setAlerta(true); }}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre del Proyecto</label>
                <input type="text" className="form-control" placeholder="Ej. App Móvil" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Categoría</label>
                <select className="form-select" required>
                  <option value="">-- Seleccionar --</option>
                  <option value="1">Desarrollo Web</option>
                  <option value="2">Móvil</option>
                  <option value="3">Backend</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Guardar Proyecto
              </button>
            </form>
          </div>
        </div>

        {/* Columna 2: Tabla */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100 p-3">
            <h4 className="card-title text-secondary mb-3">📋 Lista de Registros</h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Proyecto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>API REST Django</td>
                    <td><span className="badge bg-success">Activo</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Frontend React</td>
                    <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Base de Datos SQL</td>
                    <td><span className="badge bg-success">Activo</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
import React, { memo } from 'react';

// 'memo' evita renderizados innecesarios si las props no cambian (Punto 5)
const TablaProyectos = memo(({ proyectos, prepararEdicion, confirmarEliminacion, cargando }) => {
  if (cargando) {
    return <div className="text-center py-4">⏳ Cargando listado de registros...</div>;
  }

  if (proyectos.length === 0) {
    return <div className="alert alert-warning text-center">📭 No hay registros disponibles.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle border">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* 7. Verificar que cada elemento tenga una clave única (key={p.id}) */}
          {proyectos.map((p) => (
            <tr key={p.id}>
              <td className="fw-bold">{p.id}</td>
              <td className="text-capitalize">{p.title}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => prepararEdicion(p)}
                >
                  ✏️ Editar
                </button>
                {/* 1. Botón para eliminar */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => confirmarEliminacion(p)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TablaProyectos;
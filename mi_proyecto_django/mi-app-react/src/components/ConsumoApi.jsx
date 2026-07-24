import { useState, useEffect } from 'react';

export default function ConsumoApi() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 1. Configurar la URL de la API (puedes cambiarla por la URL de tu Django: http://127.0.0.1:8000/api/proyectos/)
  const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

  useEffect(() => {
    // 2. Realizar la solicitud GET
    const obtenerDatos = async () => {
      try {
        setCargando(true);
        setError(null);
        
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status} ${respuesta.statusText}`);
        }

        const data = await respuesta.json();
        
        // 6. Verificar la respuesta en la consola
        console.log('✅ Respuesta obtenida de la API:', data);

        // 3. Almacenar la respuesta en el estado
        setDatos(data);
      } catch (err) {
        console.error('❌ Error al conectar con la API:', err);
        setError('No se pudo conectar con el servidor. Verifica que el backend esté activo.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="container my-4">
      <div className="card shadow-sm border-0 p-4">
        <h2 className="text-primary fw-bold mb-3">(Sesión 7) Actividad 1</h2>
        <h4 className="text-secondary mb-4">🌐 Consumo de Datos desde API REST</h4>

        {/* 5. MENSAJE DE CARGA */}
        {cargando && (
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <div className="spinner-border spinner-border-sm me-3" role="status"></div>
            <div>⏳ Cargando información desde la API, por favor espera...</div>
          </div>
        )}

        {/* 5. MENSAJE DE ERROR */}
        {error && (
          <div className="alert alert-danger" role="alert">
            ⚠️ <strong>Error:</strong> {error}
          </div>
        )}

        {/* 5. MENSAJE CUANDO NO EXISTAN REGISTROS */}
        {!cargando && !error && datos.length === 0 && (
          <div className="alert alert-warning text-center" role="alert">
            📭 No existen registros disponibles en la base de datos.
          </div>
        )}

        {/* 4. MOSTRAR LA INFORMACIÓN EN UNA TABLA */}
        {!cargando && !error && datos.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle border">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Título del Proyecto / Publicación</th>
                  <th>Detalle / Contenido</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.id}</td>
                    <td className="text-capitalize text-primary fw-semibold">{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
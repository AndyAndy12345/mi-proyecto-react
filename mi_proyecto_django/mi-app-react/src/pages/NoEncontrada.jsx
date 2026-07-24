import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div style={{ padding: '30px', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', textAlign: 'center', color: '#991b1b' }}>
      <h2>⚠️ Error 404 - Página no encontrada</h2>
      <p>La ruta a la que intentas acceder no existe.</p>
      <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Volver al Inicio</Link>
    </div>
  );
}

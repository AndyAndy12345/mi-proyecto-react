import { useState } from 'react';

export default function TarjetaTarea({ titulo, descripcion, categoria, estadoInicial }) {
  const [completada, setCompletada] = useState(estadoInicial);
  const [contadorLikes, setContadorLikes] = useState(0);

  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', margin: '12px auto', maxWidth: '400px', backgroundColor: completada ? '#f0fdf4' : '#ffffff' }}>
      <span style={{ fontSize: '12px', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{categoria}</span>
      <h3 style={{ margin: '8px 0', color: '#0f172a' }}>{titulo}</h3>
      <p style={{ color: '#475569', fontSize: '14px' }}>{descripcion}</p>
      <p style={{ fontWeight: 'bold', color: completada ? '#166534' : '#991b1b' }}>
        Estado: {completada ? '✅ Completada' : '⏳ Pendiente'}
      </p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={() => setCompletada(!completada)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          {completada ? 'Marcar Pendiente' : 'Marcar Completada'}
        </button>
        <button onClick={() => setContadorLikes(contadorLikes + 1)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          👍 Likes: {contadorLikes}
        </button>
      </div>
    </div>
  );
}
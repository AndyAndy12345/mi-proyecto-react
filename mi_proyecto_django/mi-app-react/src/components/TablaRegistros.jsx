export default function TablaRegistros({ datos }) {
  return (
    <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
          <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>ID</th>
          <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Nombre</th>
          <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Rol</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr key={item.id} style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{item.id}</td>
            <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{item.nombre}</td>
            <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{item.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
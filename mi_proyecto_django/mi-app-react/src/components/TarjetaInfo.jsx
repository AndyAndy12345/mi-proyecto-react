export default function TarjetaInfo({ titulo, descripcion }) {
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '15px', margin: '15px auto', maxWidth: '400px', backgroundColor: '#f8fafc' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{titulo}</h3>
      <p style={{ color: '#475569', margin: 0 }}>{descripcion}</p>
    </div>
  );
}
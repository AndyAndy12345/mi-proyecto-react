export default function Encabezado({ titulo }) {
  return (
    <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', textAlign: 'center' }}>
      <h1>{titulo}</h1>
    </header>
  );
}
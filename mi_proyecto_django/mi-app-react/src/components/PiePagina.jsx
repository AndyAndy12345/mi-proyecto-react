export default function PiePagina({ textoFooter }) {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '15px', textAlign: 'center', marginTop: '30px' }}>
      <p style={{ margin: 0 }}>{textoFooter}</p>
    </footer>
  );
}
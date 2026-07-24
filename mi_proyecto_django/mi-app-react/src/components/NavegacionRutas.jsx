import { NavLink } from 'react-router-dom';
export default function NavegacionRutas() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#ffffff' : '#94a3b8',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <NavLink to="/" style={linkStyle}>Inicio</NavLink>
      <NavLink to="/listado" style={linkStyle}>Listado</NavLink>
      <NavLink to="/registro" style={linkStyle}>Registro</NavLink>
      <NavLink to="/acerca-de" style={linkStyle}>Acerca de</NavLink>
    </nav>
  );
}
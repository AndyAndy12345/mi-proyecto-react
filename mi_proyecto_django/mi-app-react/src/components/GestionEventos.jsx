import { useState } from 'react';

export default function GestionEventos() {
  // 1. Estado para onClick
  const [contador, setContador] = useState(0);

  // 2. Estado para onChange
  const [textoInput, setTextoInput] = useState('');

  // 3. Estado para onSubmit
  const [mensajeForm, setMensajeForm] = useState('');

  // 4. Estado para onMouseEnter / onMouseLeave
  const [tarjetaDestacada, setTarjetaDestacada] = useState(false);

  // Manejador del Formulario (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textoInput.trim() === '') {
      setMensajeForm('❌ Por favor escribe algo en el campo antes de enviar.');
    } else {
      setMensajeForm(`✅ Formulario enviado con éxito. Texto: "${textoInput}"`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2>(Sesión 6) Actividad 1: Gestión de Eventos en React</h2>
      <p style={{ color: '#475569' }}>Demostración de eventos interactivos con cambios visibles en la interfaz.</p>

      {/* EVENTO 1: onClick */}
      <section style={seccionStyle}>
        <h3>1. Evento <code>onClick</code></h3>
        <p>Valor actual del contador: <strong>{contador}</strong></p>
        <button 
          onClick={() => setContador(contador + 1)} 
          style={botonStyle}
        >
          ¡Haz clic para incrementar!
        </button>
      </section>

      {/* EVENTO 2 & 3: onChange y onSubmit */}
      <section style={seccionStyle}>
        <h3>2 & 3. Eventos <code>onChange</code> y <code>onSubmit</code></h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Escribe algo aquí..." 
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)} // Evento onChange
            style={{ padding: '8px', width: '70%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <br /><br />
          <button type="submit" style={botonStyle}>
            Enviar Formulario
          </button>
        </form>

        {/* Cambio visible por onChange */}
        <p style={{ fontSize: '14px', color: '#334155', marginTop: '10px' }}>
          Texto en tiempo real (onChange): <i>"{textoInput}"</i>
        </p>

        {/* Cambio visible por onSubmit */}
        {mensajeForm && (
          <p style={{ fontWeight: 'bold', color: mensajeForm.includes('✅') ? '#166534' : '#991b1b', background: '#f1f5f9', padding: '8px', borderRadius: '4px' }}>
            {mensajeForm}
          </p>
        )}
      </section>

      {/* EVENTO 4: onMouseEnter y onMouseLeave */}
      <section style={seccionStyle}>
        <h3>4. Evento <code>onMouseEnter</code> / <code>onMouseLeave</code></h3>
        <div 
          onMouseEnter={() => setTarjetaDestacada(true)}
          onMouseLeave={() => setTarjetaDestacada(false)}
          style={{
            padding: '20px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backgroundColor: tarjetaDestacada ? '#2563eb' : '#e2e8f0',
            color: tarjetaDestacada ? '#ffffff' : '#0f172a',
            border: tarjetaDestacada ? '2px solid #1d4ed8' : '2px solid #cbd5e1'
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {tarjetaDestacada ? '🔥 ¡El cursor está encima de la tarjeta!' : '👉 Pasa el mouse por encima de este cuadro'}
          </p>
        </div>
      </section>
    </div>
  );
}

// Estilos reutilizables
const seccionStyle = {
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const botonStyle = {
  backgroundColor: '#0f172a',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '5px',
  cursor: 'pointer'
};
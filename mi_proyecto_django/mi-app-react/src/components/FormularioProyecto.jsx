import { useState } from 'react';

export default function FormularioProyecto() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    edad: '',
    categoria: '',
    fechaInicio: '',
    comentarios: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = 'El nombre completo es obligatorio.';
    } else if (formData.nombreCompleto.trim().length < 3) {
      nuevosErrores.nombreCompleto = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(formData.correo)) {
      nuevosErrores.correo = 'Ingresa un formato de correo válido (ejemplo@dominio.com).';
    }

    if (!formData.edad) {
      nuevosErrores.edad = 'La edad es obligatoria.';
    } else if (Number(formData.edad) < 15 || Number(formData.edad) > 99) {
      nuevosErrores.edad = 'La edad permitida debe estar entre 15 y 99 años.';
    }

    if (!formData.categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría para el proyecto.';
    }

    if (!formData.fechaInicio) {
      nuevosErrores.fechaInicio = 'Selecciona la fecha de inicio del proyecto.';
    }

    if (!formData.comentarios.trim()) {
      nuevosErrores.comentarios = 'Los detalles del proyecto son obligatorios.';
    } else if (formData.comentarios.trim().length < 10) {
      nuevosErrores.comentarios = 'Los detalles deben contener al menos 10 caracteres.';
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeExito('');

    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
    } else {
      setMensajeExito('✅ ¡Formulario registrado con éxito! Datos procesados correctamente.');
      setErrores({});
      
      setFormData({
        nombreCompleto: '',
        correo: '',
        edad: '',
        categoria: '',
        fechaInicio: '',
        comentarios: ''
      });
    }
  };

  return (
    <div style={{ maxWidth: '550px', margin: '20px auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '5px' }}>(Sesión 6) Actividad 2</h2>
      <h3 style={{ textAlign: 'center', color: '#3b82f6', marginTop: '0' }}>Registro de Proyecto (Formulario Controlado)</h3>

      {mensajeExito && (
        <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Nombre Completo *</label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            placeholder="Ej. Andrea Pérez"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.nombreCompleto ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errores.nombreCompleto && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.nombreCompleto}</span>}
        </div>

        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Correo Electrónico *</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.correo ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errores.correo && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.correo}</span>}
        </div>

        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Edad (Permitido 15 - 99 años) *</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Ej. 22"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.edad ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errores.edad && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.edad}</span>}
        </div>

        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Categoría del Proyecto *</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.categoria ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          >
            <option value="">-- Selecciona una categoría --</option>
            <option value="Frontend">Desarrollo Frontend</option>
            <option value="Backend">Desarrollo Backend</option>
            <option value="BaseDeDatos">Bases de Datos</option>
            <option value="Movil">Aplicación Móvil</option>
          </select>
          {errores.categoria && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.categoria}</span>}
        </div>

        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Fecha de Inicio *</label>
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.fechaInicio ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errores.fechaInicio && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.fechaInicio}</span>}
        </div>

        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Detalles / Descripción *</label>
          <textarea
            name="comentarios"
            rows="4"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Describe el alcance del proyecto..."
            style={{ width: '100%', padding: '8px 10px', borderRadius: '5px', border: errores.comentarios ? '1.5px solid #ef4444' : '1px solid #cbd5e1', boxSizing: 'border-box' }}
          />
          {errores.comentarios && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block', fontWeight: '600' }}>{errores.comentarios}</span>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '5px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          Registrar Proyecto
        </button>
      </form>
    </div>
  );
}
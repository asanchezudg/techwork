'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import countries from '../utils/countries';
import states from '../utils/states';

export default function MiCuentaPage() {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState({
    UserID: '',
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    country: '',
    state: '',
  });
  const [cvUrl, setCVUrl] = useState('');
  const [cv, setCV] = useState(null);
  const [cvName, setCVName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solo ejecutar si existe el usuario
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/get-profile?email=${encodeURIComponent(user.email)}`);
          const data = await response.json();

          if (response.ok && data.success) {
            setUserData(data.data);
            // Mostrar el nombre del archivo CV si existe
            setCVUrl(data.data.cvUrl || '');
          } else {
            setMessage(data.message || 'Error al cargar los datos del usuario');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setMessage('Error al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCV(file);
    setCVName(file ? file.name : ''); // Mostrar el nombre del archivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key] || '');
    });
    if (cv) {
      formData.append('cv', cv);
    }

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Perfil actualizado exitosamente');
        updateUser(userData);
      } else {
        setMessage(data.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Perfil actualizado exitosamente.');
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras los datos están siendo recuperados
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>
      {message && (
        <p className={message.includes('exitosamente') ? 'text-green-600' : 'text-red-600'}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ''}
            className="w-full p-2 border rounded bg-gray-100"
            required
            readOnly
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Apellido Paterno
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="middleName" className="block mb-1">
            Apellido Materno
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={userData.middleName || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-1">
            País
          </label>
          <select
            id="country"
            name="country"
            value={userData.country || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block mb-1">
            Estado
          </label>
          <select
            id="state"
            name="state"
            value={userData.state || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona un estado</option>
            {states[userData.country]?.map((state) => (
            <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="cv" className="block mb-1">
        CV (PDF)
      </label>
      <input
        type="file"
        id="cv"
        name="cv"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      {cvName && <p className="mt-2 text-gray-600">Archivo cargado: {cvName}</p>}
    </div>
    <div>
      <label htmlFor="cv" className="block mb-1">
        CV (PDF Cargado Anteriormente)
      </label>
      {cvName ? (
        <p className="text-gray-600">Archivo cargado: {cvName}</p>
      ) : (
        <p>No hay CV cargado anteriormente.</p>
      )}
    </div>
        <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
    >
      Guardar Cambios
    </button>
  </form>
</div>
);
}
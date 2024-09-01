'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import countries from '../utils/countries'; // Necesitarás crear este archivo con la lista de países
import states from '../utils/states'; // Necesitarás crear este archivo con la lista de estados por país

export default function MiCuentaPage() {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    country: '',
    state: '',
    cv: null
  });

  useEffect(() => {
    if (user) {
      setUserData({ ...userData, ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, cv: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar los datos del usuario en el backend
    // y luego actualizar el contexto de autenticación
    await updateUser(userData);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Contraseña</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="firstName" className="block mb-1">Nombre</label>
          <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">Apellido Paterno</label>
          <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="middleName" className="block mb-1">Apellido Materno</label>
          <input type="text" id="middleName" name="middleName" value={userData.middleName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Dirección</label>
          <input type="text" id="address" name="address" value={userData.address} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="country" className="block mb-1">País</label>
          <select id="country" name="country" value={userData.country} onChange={handleChange} className="w-full p-2 border rounded">
            {countries.map(country => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block mb-1">Estado</label>
          <select id="state" name="state" value={userData.state} onChange={handleChange} className="w-full p-2 border rounded">
            {states[userData.country]?.map(state => (
              <option key={state.code} value={state.code}>{state.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cv" className="block mb-1">CV (PDF)</label>
          <input type="file" id="cv" name="cv" accept=".pdf" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
}
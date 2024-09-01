'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

// Componente de Loader
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(false);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        setFormData({ fullName: '', email: '', password: '', userType: '' });
        setIsLoading(true);
        // Esperar 3 segundos antes de redirigir
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setMessage(`Error al registrar: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setMessage('Error al registrar. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-4">
          <div className="logo text-2xl font-bold">
            <Link className="text-green-600" href="/">TechWork Remote</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/quiero-contratar" className="text-gray-600">Quiero contratar</Link></li>
              <li><Link href="/quiero-trabajar" className="text-gray-600">Quiero trabajar</Link></li>
              <li><Link href="/ingresa" className="text-gray-600">Ingresa</Link></li>
              <li><Link href="/registrate" className="bg-green-600 text-white px-4 py-2 rounded">Registrate</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Regístrate en <span className="text-green-600">TechWork Remote</span>
            </h1>
            <p className="mb-8">Crea tu cuenta y comienza a conectar con oportunidades laborales o talentos remotos.</p>
            
            {message && <p className={message.includes('exitoso') ? 'text-green-600' : 'text-red-600'}>{message}</p>}
            
            {isLoading ? (
              <Loader />
            ) : (
              <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input type="text" name="fullName" placeholder="Nombre completo" className="w-full p-2 border rounded" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <input type="email" name="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <input type="password" name="password" placeholder="Contraseña" className="w-full p-2 border rounded" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <select name="userType" className="w-full p-2 border rounded" value={formData.userType} onChange={handleChange} required>
                    <option value="">Selecciona una opción</option>
                    <option value="Empleador">Quiero contratar</option>
                    <option value="Trabajador">Quiero trabajar</option>
                  </select>
                </div>
                <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg w-full">Crear cuenta</button>
              </form>
            )}
          </section>
        </main>
        <footer className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4, text-green-600">Proyecto V</h2>
          <h3 className="text-xl font-semibold mb-2, text-green-600">Alumnos:</h3>
          <p className="mb-1">Erika Nathaly Pacheco Espíndola</p>
          <p className="mb-1">Angel Francisco Sánchez De Tagle Márquez</p>
          <p className="mb-4">Ramiro Cesar Vargas Cárdenass</p>
          <div className="flex justify-center">
            <Image 
              src="/udg-virtual-logo.png" 
              alt="UDG Virtual Logo" 
              width={150} 
              height={150}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
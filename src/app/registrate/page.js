// app/registrate/page.js
import Link from 'next/link'

export default function Register() {
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
          
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <input type="text" placeholder="Nombre completo" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <select className="w-full p-2 border rounded">
                <option>Quiero contratar</option>
                <option>Quiero trabajar</option>
              </select>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg w-full">Crear cuenta</button>
          </form>
        </section>
      </main>
      </div>
    </div>
  )
}
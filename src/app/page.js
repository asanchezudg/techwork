import Link from 'next/link'
import Image from 'next/image'

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
              Impulsa tu negocio con el <br />
              <span className="text-green-600">mejor talento remoto</span><br />
              de América Latina
            </h1>
            <p className="mb-4">
              Desarrolla tu negocio de manera rápida y segura.<br />
              Te conectamos con miles de talentos en tu idioma y zona horaria
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg">Quiero contratar</button>
            <Link href="#" className="ml-4 text-green-600">¿Quieres trabajar? →</Link>
          </section>

          <div className="flex justify-around mb-12">
            {/* Placeholder for circular images */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-200 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold mt-4 mb-2">DEVELOPERS</h2>
              <p>Contrata talento pre-seleccionado y certificado para trabajar en las tecnologías que tu negocio necesita por un tiempo determinado.</p>
            </div>
            <div className="border p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-200 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold mt-4 mb-2">FREELANCERS</h2>
              <p>Contrata talento de distintas disciplinas para trabajar por objetivos u horas, recibiendo múltiples propuestas y acordando un precio.</p>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4, text-green-600">Proyecto V</h2>
          <h3 className="text-xl font-semibold mb-2, text-green-600">Alumnos:</h3>
          <p className="mb-1">Erika Nathaly Pacheco Espíndola</p>
          <p className="mb-1">Angel Francisco Sánchez De Tagle Márquez</p>
          <p className="mb-4">Ramiro Cesar Vargas Cárdenas</p>
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
  )
}
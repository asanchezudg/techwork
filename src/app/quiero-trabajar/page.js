'use client';
import { useState } from 'react';
import Link from 'next/link';

const jobListings = [
  { id: 1, title: "Desarrollador Full Stack", company: "TechCo", rate: "$30-50/hora", skills: ["React", "Node.js", "MongoDB"] },
  { id: 2, title: "Diseñador UX/UI", company: "DesignHub", rate: "$25-40/hora", skills: ["Figma", "Adobe XD", "Sketch"] },
  { id: 3, title: "Especialista en Marketing Digital", company: "GrowthMax", rate: "$20-35/hora", skills: ["SEO", "Google Ads", "Social Media"] },
  { id: 4, title: "Ingeniero de DevOps", company: "CloudSystems", rate: "$40-60/hora", skills: ["AWS", "Docker", "Kubernetes"] },
  { id: 5, title: "Escritor de Contenido Técnico", company: "TechWrite", rate: "$25-40/hora", skills: ["Redacción técnica", "SEO", "Markdown"] },
];

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-4">
          <div className="logo text-2xl font-bold">
            <Link href="/">TechWork Remote</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/quiero-contratar" className="text-gray-600">Quiero contratar</Link></li>
              <li><Link href="/quiero-trabajar" className="text-green-600 border-b-2 border-green-600">Quiero trabajar</Link></li>
              <li><Link href="/ingresa" className="text-gray-600">Ingresa</Link></li>
              <li><Link href="/registrate" className="bg-green-600 text-white px-4 py-2 rounded">Registrate</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Encuentra tu próximo <span className="text-green-600">trabajo remoto</span>
          </h1>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar trabajos (ej. desarrollador, diseñador)"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Trabajos disponibles</h2>
            {filteredJobs.length === 0 ? (
              <p className="text-center text-gray-600">No se encontraron trabajos que coincidan con tu búsqueda.</p>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="mb-6 p-6 border rounded-lg hover:shadow-lg transition duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <span className="text-green-600 font-semibold">{job.rate}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link href={`/trabajo/${job.id}`} className="inline-block mt-4 text-green-600 hover:text-green-800 transition duration-200">
                    Ver detalles
                  </Link>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
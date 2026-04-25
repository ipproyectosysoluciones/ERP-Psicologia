import { Link } from 'react-router-dom';
import { LeadForm } from '../components/widgets/LeadForm';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h1 className="text-xl font-bold text-white">Clínica de Psicología</h1>
              <p className="text-xs text-purple-200">Tu bienestar es nuestra prioridad</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-white hover:text-purple-200 transition-colors">
              Iniciar sesión
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1 bg-purple-800 text-purple-200 rounded-full text-sm mb-6">
              Atención profesional personalizada
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Cuida tu salud mental
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                con profesionales
              </span>
            </h2>
            <p className="text-lg text-purple-200 mb-8 max-w-lg">
              Brindamos atención psicológica y psiquiátrica de calidad. 
              Nuestro equipo te acompaña en cada paso del proceso de bienestar emocional.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contacto"
                className="px-8 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Solicitar turno
              </a>
              <a
                href="#servicios"
                className="px-8 py-3 bg-transparent border border-purple-400 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
              >
                Ver servicios
              </a>
            </div>
          </div>

          <div id="contacto" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-30" />
            <div className="relative">
              <LeadForm
                origen="landing-web"
                campaign="homepage-2025"
                variant="modal"
                className="bg-white/10 backdrop-blur-lg"
              />
            </div>
          </div>
        </div>
      </main>

      <section id="servicios" className="container mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold text-white text-center mb-12">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-purple-800">
            <span className="text-3xl mb-4 block">🧠</span>
            <h4 className="text-lg font-semibold text-white mb-2">Psicología Clínica</h4>
            <p className="text-purple-200 text-sm">
              Terapia individual, de pareja y familiar. Enfoque cálido y profesional para cada paciente.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-purple-800">
            <span className="text-3xl mb-4 block">💊</span>
            <h4 className="text-lg font-semibold text-white mb-2">Psiquiatría</h4>
            <p className="text-purple-200 text-sm">
              Evaluación y tratamiento farmacológico. Seguimiento personalizado.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-purple-800">
            <span className="text-3xl mb-4 block">📹</span>
            <h4 className="text-lg font-semibold text-white mb-2">Telemedicina</h4>
            <p className="text-purple-200 text-sm">
              Consultas por videollamada. удобно y desde cualquier lugar.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Necesitás ayuda ahora?
          </h3>
          <p className="text-purple-100 mb-6">
            No esperes más. Nuestro equipo está listo para acompañarte.
          </p>
          <a
            href="tel:+5491112345678"
            className="inline-block px-8 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-purple-100 transition-colors"
          >
            📞 Llamar ahora
          </a>
        </div>
      </section>

      <footer className="container mx-auto px-6 py-8 border-t border-purple-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-300 text-sm">
            © 2025 Clínica de Psicología. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-purple-300">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
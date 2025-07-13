import type { User } from '@/types/index';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface FooterProps {
  user: User['_id'] | undefined;
}

export default function Footer({ user }: FooterProps) {
  return (
    <footer className="py-10 w-full bg-container/80">
      <div className="w-6xl mx-auto text-slate-50">
        <div className="flex flex-row justify-between">
          <nav className="flex flex-col justify-start items-center gap-4">
            <h3 className="text-center font-bold text-2xl title">Enlaces</h3>
            <ul className="flex flex-col justify-center items-center">
              <li>
                <Link
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                  to={user ? `/snippet/user/${user}` : '/snippet/guest'}
                >
                  Modo invitado
                </Link>
              </li>
              <li>
                <Link
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                  to={user ? `/snippet/user/${user}` : '/auth/register'}
                >
                  Registrarse
                </Link>
              </li>
              <li>
                <Link
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                  to={user ? `/snippet/user/${user}` : '/auth/login'}
                >
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col justify-start items-center gap-4">
            <h3 className="text-2xl font-bold title">Zniply</h3>
            <ul className="flex flex-col justify-start items-center">
              <li className="text-md py-1 text-slate-200">
                Administra, guarda y comparte tus snippets de código fácilmente.
              </li>
              <li className="text-md py-1 text-slate-200">
                Code in orbit. Solutions out of this world.
              </li>
              <li className="text-md py-1 text-slate-200">
                Hecho con <HeartIcon className="size-5 text-red-400 inline-block" /> por EdenBlood
              </li>
            </ul>
          </div>

          <nav className="flex flex-col justify-start items-center gap-4">
            <h3 className="text-center font-bold text-2xl title">Legal</h3>
            <ul className="flex flex-col justify-center items-center">
              <li>
                <Link
                  to="/privacy"
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-md text-slate-200 hover:text-accent-yellow transition-colors duration-300 cursor-pointer py-1"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="text-sm text-center mt-6">
          © {new Date().getFullYear()} Zniply. Todos los derechos reservados.{' '}
          <span className="text-sm">Version: 1.0.0</span>
        </p>
      </div>
    </footer>
  );
}

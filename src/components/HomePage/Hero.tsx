import type { User } from '@/types/index';
import { Link } from 'react-router-dom';

type HeroProps = {
  isLogged: boolean;
  user: User['_id'] | undefined;
};

export default function Hero({ isLogged, user }: HeroProps) {
  return (
    <main className="w-6xl mx-auto pt-18 h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-8xl title font-bold text-slate-50 drop-shadow-md drop-shadow-slate-200/50 text-center">
        Crea, Comparte y Almacena Snippets
      </h1>
      <p className="text-2xl title text-center text-white font-normal">
        Zniply es una plataforma donde puedes crear bloques de código para compartir con otras
        personas, que son difíciles de memorizar o simplemente para lo que quieras.
      </p>
      <p className="text-2xl title text-center text-white font-normal">
        Puedes crear hasta 3 snippets sin crear una cuenta{' '}
        <Link
          className="inline-block text-accent-yellow hover:text-yellow-300 transition-all duration-500 hover:drop-shadow-sm hover:drop-shadow-accent-yellow/50"
          to={isLogged ? `/snippet/user/${user}` : `/snippet/guest`}
        >
          Haciendo click aquí
        </Link>
      </p>
    </main>
  );
}

import Footer from '@/components/HomePage/Footer';
import Loader from '@/components/Loader';
import SnippetHeaderAuth from '@/components/Snippet/SnippetHeaderAuth';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Link, Outlet } from 'react-router-dom';

export default function LandingPageLayout() {
  const { data: user, isLoading: authLoading } = useAuthContext();

  const isLogged = !!user;

  if (authLoading) return <Loader />;
  return (
    <>
      <div className="relative h-full w-full">
        <header className="w-6xl shadow-md bg-navbar rounded-2xl z-20 fixed left-1/2 -translate-x-1/2 top-2">
          <nav className="flex justify-between px-5 items-center py-2">
            <div className="flex items-center">
              <Link className="mr-7 group" to={'/'}>
                <span className="transform p-0 duration-500 group-hover:px-1">&lt;</span>
                <h2 className="inline-block text-2xl text-black font-bold  drop-shadow-sm hover:drop-shadow-lg transform duration-300 group-hover:tracking-wider">
                  Zniply
                </h2>
                <span className="transform p-0 duration-500 group-hover:px-1">&gt;</span>
              </Link>

              <Link
                className="font-semibold rounded-lg text-lg py-1.5 px-3 text-container/80 bg-transparent hover:bg-slate-50 hover:text-accent transition-colors duration-300"
                to={isLogged ? `/snippet/user/${user?._id}` : '/snippet/guest'}
              >
                {isLogged ? 'Gestiona tus snippets' : 'Crea snippets como invitado'}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <SnippetHeaderAuth />
            </div>
          </nav>
        </header>

        <div className="bg-transparent min-h-screen">
          <Outlet />
        </div>

        <Footer user={user?._id} />
      </div>
    </>
  );
}

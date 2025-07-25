import Loader from '@/components/Loader';
import SnippetHeader from '@/components/Snippet/SnippetHeader';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { Snippet } from '../types';
import AskModal from '@/components/AskModal';

export default function AppLayout() {
  const [guestSnippets, setGuestSnippets] = useState<Snippet[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useAuthContext();

  const isGuest: boolean = data ? false : true;

  useEffect(() => {
    if (isLoading) return;

    if (!data) return;

    const alreadyAsked = localStorage.getItem('Zniply_Asked');
    const guestSnippetsRaw = localStorage.getItem('Zniply_Guest_Snippets');

    if (alreadyAsked || !guestSnippetsRaw) return;

    const parsed: Snippet[] = JSON.parse(guestSnippetsRaw);

    if (parsed.length > 0) {
      setGuestSnippets(parsed);
      navigate(location.pathname + `?ask=true`);
    }
  }, [location.pathname, data, navigate, isLoading]);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="w-full h-screen grid grid-rows-[auto_1fr_auto] gap-4">
        <SnippetHeader isGuest={isGuest} />

        <div className="flex flex-row gap-6 overflow-hidden w-6xl mx-auto">
          <Outlet />
        </div>

        <footer className="text-white pb-0.5">
          <div className="text-center text-sm">
            <p>
              © {new Date().getFullYear()}{' '}
              <Link
                to={'/'}
                className="text-accent-yellow/90 hover:text-accent-yellow transition-colors duration-300"
              >
                Zniply
              </Link>
              . Todos los derechos reservados. <span className="text-xs">Version: 1.0.0</span>
            </p>
          </div>
        </footer>
      </div>

      <AskModal guestSnippets={guestSnippets} />
    </>
  );
}

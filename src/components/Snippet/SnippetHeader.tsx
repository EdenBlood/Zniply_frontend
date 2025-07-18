import { Link } from 'react-router-dom';
import SnippetHeaderAuth from './SnippetHeaderAuth';
import SearchInput from './SearchInput';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';

type SnippetHeaderProps = {
  isGuest: boolean;
};

export default function SnippetHeader({ isGuest }: SnippetHeaderProps) {
  const [canCreate, setCanCreate] = useState<boolean>(true);
  const { data: user } = useAuthContext();

  useEffect(() => {
    const loadStorage = () => {
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets');
      if (storage) {
        const snippets = JSON.parse(storage);
        if (snippets.length >= 3) {
          setCanCreate(false);
        }
      }
    };
    if (isGuest) {
      loadStorage();
    }
  }, [isGuest]);

  return (
    <header className="w-6xl shadow-md mx-auto mt-2 bg-navbar rounded-2xl z-20">
      <nav className="flex justify-between gap-6 px-5 items-center py-2">
        <div className="flex items-center">
          <Link
            className="mr-7 group"
            to={!isGuest ? `/snippet/user/${user?._id}` : '/snippet/guest'}
          >
            <h1 className="block text-2xl text-black font-bold  drop-shadow-sm hover:drop-shadow-lg transform duration-500 group-hover:tracking-wider">
              <span className="transform p-0 duration-500 group-hover:px-1 font-normal">&lt;</span>
              Zniply
              <span className="transform p-0 duration-500 group-hover:px-1 font-normal">&gt;</span>
            </h1>
          </Link>

          <Link
            className="block w-max font-semibold rounded-lg text-lg py-1.5 px-3 text-container/80 bg-transparent hover:text-accent transition-colors duration-300"
            to={
              !isGuest
                ? '/create-snippet'
                : canCreate
                ? '/create-snippet/guest'
                : '/auth/create-account'
            }
          >
            {canCreate ? 'Crear Snippet' : 'Limite alcanzado'}
          </Link>
        </div>

        <SearchInput />

        <div className="flex items-center gap-2">
          <SnippetHeaderAuth />
        </div>
      </nav>
    </header>
  );
}

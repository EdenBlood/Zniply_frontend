import { useAuthContext } from '@/hooks/useAuthContext';
import useLogout from '@/hooks/useLogout';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SnippetHeaderAuth() {
  const navigate = useNavigate();

  const { logout, isPending } = useLogout();
  const { data: user } = useAuthContext();

  if (!user)
    return (
      <>
        <button
          className="font-semibold text-lg py-1 text-white bg-container/80 hover:bg-container px-3 rounded-lg hover:text-violet-300 hover:shadow-lg transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
          disabled={isPending}
          onClick={() => navigate('/auth/create-account')}
        >
          Registrarse
        </button>
        <button
          className="font-semibold text-lg py-1 text-white bg-container/80 hover:bg-container px-3 rounded-lg hover:text-violet-300 hover:shadow-lg transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
          disabled={isPending}
          onClick={() => navigate('/auth/login')}
        >
          Iniciar Sesión
        </button>
      </>
    );
  return (
    <>
      <Menu>
        <MenuButton
          className={
            'outline-none data-active:text-purple-300 data-active:bg-container bg-container/80 hover:bg-container hover:text-purple-300  cursor-pointer group text-white rounded-lg transition-colors duration-300'
          }
        >
          <ChevronDownIcon
            strokeWidth={2}
            className=" size-8 p-1 transition-transform duration-300 rotate-0 group-data-active:rotate-180"
          />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="outline-none flex flex-col bg-container z-50 w-40 overflow-hidden rounded-lg mt-1"
        >
          <MenuItem>
            <p className="text-semibold text-md text-center py-2 text-white cursor-default">
              Hola {user.name}!
            </p>
          </MenuItem>
          <MenuItem>
            <button
              className="font-semibold text-md py-2 text-center text-slate-50 hover:text-black bg-transparent hover:bg-slate-50 transition-colors duration-300 cursor-pointer"
              onClick={() => navigate(`/snippet/user/${user._id}`)}
            >
              Mis snippets
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="font-semibold text-md py-2 text-center text-indigo-400 hover:text-indigo-200 bg-transparent hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
              disabled={isPending}
              onClick={() => navigate(`/create-snippet`)}
            >
              Crear Snippet
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="font-semibold text-md py-2 text-center text-red-600 hover:text-red-200 bg-transparent hover:bg-red-700 transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
              disabled={isPending}
              onClick={() => logout()}
            >
              {isPending ? 'Cerrando Sesión...' : 'Cerrar Sesión'}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}

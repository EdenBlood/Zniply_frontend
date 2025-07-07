import { useAuthContext } from "@/hooks/useAuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"

type SnippetActionsProps = {
  snippetId: string;
  isPending: boolean;
  isGuest?: boolean;
}

export default function SnippetActions({ snippetId, isPending, isGuest }: SnippetActionsProps) {
  const navigate = useNavigate();
  const location = useLocation()

  const { data: user } = useAuthContext();

  return (
    <Menu>
      <MenuButton className={'absolute right-5 top-3 outline-none data-active:text-purple-300 data-active:bg-container bg-container/80 hover:bg-container hover:text-purple-300  cursor-pointer  text-white rounded-lg transition-colors duration-300'}>
        <ChevronDoubleDownIcon className="size-8 p-1.5" />
      </MenuButton>
      <MenuItems anchor="bottom" className="focus:outline-none z-50 mt-1 flex flex-col shadow-lg w-40 bg-container overflow-hidden rounded-lg">
        <MenuItem>
          <button
            onClick={() => {
              if (!isGuest) navigate(`/edit-snippet/user/${user?._id}/${snippetId}`)
              else navigate(`/edit-snippet/guest/${snippetId}`)
            }}
            className='text-md bg-transparent text-white font-semibold text-center py-2 hover:bg-accent-violet cursor-pointer transition-colors duration-300'
          >Editar Snippet</button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => navigate(location.pathname + `?delete-snippet=${snippetId}`)}
            className='text-md text-red-600 font-semibold text-center py-2 hover:bg-red-700 hover:text-red-200 disabled:bg-red-200 disabled:text-black disabled:hover:bg-red-200 cursor-pointer transition-colors duration-300'
            disabled={isPending}
          >{isPending ? "Eliminado..." : "Eliminar Snippet"}</button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
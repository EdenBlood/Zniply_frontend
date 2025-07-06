import { useAuthContext } from "@/hooks/useAuthContext";
import type { Snippet } from "@/types/index";
import { useNavigate } from "react-router-dom"

type SnippetActionsProps = {
  snippetId: string;
  isPending: boolean;
  handleDeleteSnippet: (snippetId: Snippet["_id"]) => void;
  isGuest?: boolean;
}

export default function SnippetActions({ snippetId, isPending, handleDeleteSnippet, isGuest }: SnippetActionsProps) {
  const navigate = useNavigate();

  const { data: user } = useAuthContext();

  return (
    <div className='absolute right-5 top-3 flex flex-row gap-4'>
      <button
        onClick={() => {
          if (!isGuest) navigate(`/edit-snippet/user/${user?._id}/${snippetId}`)
          else navigate(`/edit-snippet/guest/${snippetId}`)
        }}
        className='text-sm bg-accent text-white font-semibold px-2 py-0.5 rounded-lg hover:bg-accent-violet cursor-pointer hover:scale-105 transition-transform duration-300'
      >Editar</button>

      <button
        onClick={() => handleDeleteSnippet(snippetId)}
        className='text-sm bg-red-600 text-white font-semibold px-2 py-0.5 rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:text-black disabled:hover:bg-red-300 disabled:hover:scale-100 cursor-pointer hover:scale-105 transition-transform duration-300'
        disabled={isPending}
      >{isPending ? "Eliminado..." : "Eliminar"}</button>
    </div>
  )
}
import type { Snippet } from "@/types/index"
import { useEffect, useState } from "react"
import SnippetNavCard from "./SnippetNavCard"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"


export default function GuestSidebar() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  
  useEffect(() => {
    const loadSnippets = () => {
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
      if (storage) {
        try {
          const parsed: Snippet[] = JSON.parse(storage)
          
          if (Array.isArray(parsed)) setSnippets(parsed);
        } catch (error) {
          toast.error('Snippets en localStorage corrompidos')
          console.log(error)
        }
      }
    };

    loadSnippets();

    window.addEventListener('guest-snippets-updated', loadSnippets)

    return () => window.removeEventListener('guest-snippets-updated', loadSnippets)
  }, [])

  return (
    <aside className="w-88 sticky bg-container/50 rounded-xl h-min max-h-full overflow-y-auto overflow-hidden">
      <div className="sticky top-0 left-0 w-full h-3 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <nav className="p-4 -my-4 flex flex-col gap-3">

        <div className="p-2 rounded-md w-full max-w-full bg-slate-50 ">
          <p className="text-accent-violet text-sm font-bold text-pretty break-words w-full">Guest {' '}<span className="text-black">Snippet's</span></p>
        </div>

        {snippets.length > 0 ? (snippets.map((snippet: Snippet) => (
          <SnippetNavCard key={snippet._id} snippet={snippet} to={`/snippet/guest/${snippet._id}`} />
          
        ))) : (
          
          <Link className="block font-normal text-sm p-2 rounded-md text-slate-50 hover:text-violet-300 hover:bg-slate-500/10 text-center transition-colors duration-200" to={"/create-snippet/guest"}>
            <h3 className="text-sm font-bold text-pretty break-words w-full">¿Aún no tienes Snippets?</h3>
            <p className="font-normal text-xs line-clamp-1 overflow-hidden text-ellipsis opacity-90 w-full">Click aquí para crear uno</p>
          </Link>
        )}

        <div className="rounded-md w-full max-w-full">
        { snippets.length >= 3 ?  (
          <Link className="block " to={`/auth/create-account`}>
            <p className="p-2 rounded-md text-gray-300 text-sm font-bold text-pretty w-full text-center hover:text-violet-300 hover:bg-slate-500/10 transition-colors duration-200 group">Ya excediste el máximo de Snippets, si no tienes una cuenta crea una <span className="text-accent group-hover:text-accent-violet transition-colors duration-200">Aquí</span></p>
          </Link>
        )
        : (
          <p className="text-gray-300 text-sm font-bold text-pretty break-words w-full text-center">Como invitado podrás tener máximo 3 Snippets</p>
        ) }
        </div>

      </nav>
      <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/20 to-transparent z-10" />
    </aside>
  )
}

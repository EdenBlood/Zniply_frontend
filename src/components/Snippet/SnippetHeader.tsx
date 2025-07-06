import { Link } from "react-router-dom"
import SnippetHeaderAuth from "./SnippetHeaderAuth"
import SearchInput from "./SearchInput"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect, useState } from "react"

type SnippetHeaderProps = {
  isGuest: boolean
}

export default function SnippetHeader({ isGuest }: SnippetHeaderProps) {
  const [canCreate, setCanCreate] = useState<boolean>(true)
  const { data: user } = useAuthContext()

  useEffect(() => {
    const loadStorage = () => {
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
      if (storage) {
        const snippets = JSON.parse(storage)
        if (snippets.length >= 3) {
          setCanCreate(false)
        }
      }
    }
    if (isGuest) {
      loadStorage()
    }
  }, [isGuest])

  return (
    <header className="w-6xl shadow-md mx-auto mt-2 bg-navbar rounded-2xl z-20">
      <nav className='flex justify-between px-5 items-center py-2'>
        <div className='flex items-center'>
          <Link className='mr-10' to={!isGuest ? `/snippet/user/${user?._id}` : "/snippet/guest"}>
            <h2 className='text-2xl text-black font-bold  drop-shadow-sm hover:drop-shadow-lg transform duration-300 hover:tracking-wider'>Zniply</h2>
          </Link>

          <Link
            className='font-semibold text-xl border-r border-l px-2 py-1 text-container/80 border-slate-300 hover:text-accent hover:border-accent transition-colors duration-300'
            to={!isGuest 
              ? "/create-snippet" 
              : canCreate 
                ? "/create-snippet/guest" 
                : "/auth/create-account"
            }
          >
            {canCreate ? "Crear Snippet" : "Regístrate"}
          </Link>
        </div>

        <div className="w-88 flex items-center">
          <SearchInput />
        </div>

        <div className='flex items-center gap-10'>
          <SnippetHeaderAuth />
        </div>
      </nav>
    </header>
  )
}

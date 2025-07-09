import useGetAllUserSnippets from '@/hooks/useGetAllUserSnippets'
import type { Snippet } from '@/types/index'
import { Link } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'
import SnippetNavCard from './SnippetNavCard'
import Loader from '../Loader'

export default function MySidebar() {
  const { data: user } = useAuthContext()
  
  const { snippets, isLoading } = useGetAllUserSnippets(user!._id)

  if (isLoading) return <Loader />
  return (
    <aside className="w-88 sticky bg-container/50 rounded-xl h-min max-h-full overflow-y-auto overflow-hidden">
      <div className="sticky top-0 left-0 w-full h-3 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <nav className="p-4 -my-4 flex flex-col gap-3">
        
        {snippets.length ? (snippets.map((snippet: Snippet) => (

          <SnippetNavCard key={snippet._id} snippet={snippet} to={`/snippet/user/${user?._id}/${snippet._id}`} />
          
        ))) : (

          <Link className="font-normal text-sm p-2 rounded-md text-slate-50 hover:text-violet-300 hover:bg-slate-500/10 text-center" to={"/create-snippet"}>
            <h3 className="text-sm font-bold text-pretty break-words w-full">¿Aún no tienes Snippets?</h3>
            <p className="font-normal text-xs line-clamp-1 overflow-hidden text-ellipsis opacity-90 w-full">Click aquí para crear uno</p>
          </Link>
        )}
        
      </nav>
      <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/20 to-transparent z-10" />
    </aside>
  )
}


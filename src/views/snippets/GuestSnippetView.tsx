import EditorReadonly from "@/components/EditorReadonly";
import SnippetActions from "@/components/Snippet/SnippetActions";
import { useEffect, useState } from "react";
import type { Snippet } from "@/types/index";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type GuestSnippetViewProps = {
  isGuest?: boolean
}

export default function GuestSnippetView({ isGuest }: GuestSnippetViewProps) {
  const [snippet, setSnippet] = useState<Snippet>()
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams();
  const snippetId: string = params.snippetId!;

  const navigate = useNavigate()

  useEffect(() => {
    const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
    if (storage) {
      const snippets = JSON.parse(storage);
      setSnippet(snippets.filter((snippet: Snippet) => snippet._id === snippetId)[0])
    }
    setIsLoading(false)
  }, [snippetId])

  const handleDeleteSnippet = (snippedId: Snippet['_id']) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este snippet? Esta acción no se puede deshacer.")) {
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets');
      if (storage) {
        const snippets = JSON.parse(storage);
        const snippetsFiltered = snippets.filter((snippet: Snippet) => snippet._id !== snippedId)

        window.localStorage.setItem('Zniply_Guest_Snippets', JSON.stringify(snippetsFiltered))

        window.dispatchEvent(new Event('guest-snippets-updated'))
        toast.success('Snippet eliminado');
        navigate('/snippet/guest')
      } else {
        toast.error('Snippet no encontrado');
      }
    }
  }

  if (!snippet && !isLoading) {
    toast.error('Snippet no encontrado');
    return <Navigate to="/snippet/guest" />
  }
  if (snippet) return (
    <article className='w-full relative'>
      <EditorReadonly content={snippet.code} />

      {(
        <SnippetActions
          snippetId={snippet._id}
          isPending={false}
          handleDeleteSnippet={handleDeleteSnippet}
          isGuest={isGuest}
        />
      )}
    </article>
  )
}


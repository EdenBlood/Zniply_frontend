import TipTap from "@/components/TipTap";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { Snippet } from "@/types/index";
import { toast } from "react-toastify";

type EditSnippetGuestViewProps = {
  isGuest?: boolean
}

export default function EditSnippetGuestView({ isGuest }: EditSnippetGuestViewProps) {
  const [snippet, setSnippet] = useState<Snippet>()
  const [isLoading, setIsLoading] = useState(true)
  
  const params = useParams();
  const snippetId:string = params.snippetId!
  
  useEffect(() => {
    const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
    if (storage) {
      const snippets = JSON.parse(storage)
      const snippet = snippets.filter((snippet: Snippet) => snippet._id === snippetId)[0]
      setSnippet(snippet)
    }
    setIsLoading(false)
  }, [snippetId])

  if (!snippet && !isLoading){ 
    toast.error('Snippet no encontrado');
    return <Navigate to="/snippet/guest" />
  } 
  if (snippet) return (
    <>
      <div className="relative overflow-y-auto">
        <TipTap contentApi={snippet} isGuest={isGuest} />
      </div>
    </>
  )
}

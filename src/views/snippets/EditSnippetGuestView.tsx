import TipTap from "@/components/TipTap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Snippet } from "@/types/index";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loader from "@/components/Loader";
import Seo from "@/extensions/Seo";

type EditSnippetGuestViewProps = {
  isGuest?: boolean
}

export default function EditSnippetGuestView({ isGuest }: EditSnippetGuestViewProps) {
  const [snippet, setSnippet] = useState<Snippet>()
  const [isLoading, setIsLoading] = useState(true)
  
  const params = useParams();
  const snippetId:string = params.snippetId!

  const navigate = useNavigate()
  
  const { data: user } = useAuthContext();

  useEffect(() => {
    if (user) {
      toast.error('No autorizado');
      navigate(`/snippet/user/${user._id}`, {replace: true});
      return;
    }
  }, [user, navigate]);
  
  useEffect(() => {
    const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
    if (storage) {
      const snippets = JSON.parse(storage)
      const snippet = snippets.find((snippet: Snippet) => snippet._id === snippetId)
      setSnippet(snippet)
    }
    setIsLoading(false)
  }, [snippetId])

  useEffect(() => {
    if (!snippet && !isLoading && user === null){ 
      toast.error('Snippet no encontrado');
      navigate("/snippet/guest", {replace: true})
      return;
    } 
  },[snippet, isLoading, user, navigate])
  
  const metaData = {
    title: "Editar Snippet",
    description: "Editar snippet",
    ogTitle: "Editar snippet",
    ogDescription: "Editar snippet",
    canonical: `https://zniply.space/edit-snippet/guest/${snippetId}`
  }
  
  if (isLoading) return <Loader/>
  if (snippet) return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />

      <div className="relative overflow-y-auto">
        <TipTap contentApi={snippet} isGuest={isGuest} />
      </div>
    </>
  )
}

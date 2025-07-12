import EditorReadonly from "@/components/EditorReadonly";
import SnippetActions from "@/components/Snippet/SnippetActions";
import { useEffect, useState } from "react";
import type { Snippet } from "@/types/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteSnippetModal from "@/components/Snippet/DeleteSnippetModal";
import Loader from "@/components/Loader";
import Seo from "@/extensions/Seo";

type GuestSnippetViewProps = {
  isGuest?: boolean;
};

export default function GuestSnippetView({ isGuest }: GuestSnippetViewProps) {
  const [snippet, setSnippet] = useState<Snippet>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const snippetId: string = params.snippetId!;

  const navigate = useNavigate();

  // Revisamos si esta logueado y si no lo esta nos traemos el snippet 
  useEffect(() => {
    const storage = window.localStorage.getItem("Zniply_Guest_Snippets");
    if (storage) {
      const snippets = JSON.parse(storage);
      const found = snippets.find((snippet: Snippet) => snippet._id === snippetId)

      // Comprobamos que haya algún snippet
      if (!found) {
        toast.error("Snippet no encontrado");
        navigate("/snippet/guest", { replace: true })
        return;
      }

      setSnippet(found);
    } else {
      toast.error('No hay snippets en localStorage')
      navigate("/snippet/guest", { replace: true })
    }
    setIsLoading(false);

  }, [snippetId, navigate]);

  // Función para eliminar el snippet
  const handleDeleteSnippet = (snippedId: Snippet["_id"]) => {
    const storage = window.localStorage.getItem("Zniply_Guest_Snippets");
    if (storage) {
      const snippets = JSON.parse(storage);
      const snippetsFiltered = snippets.filter(
        (snippet: Snippet) => snippet._id !== snippedId
      );

      window.localStorage.setItem(
        "Zniply_Guest_Snippets",
        JSON.stringify(snippetsFiltered)
      );

      window.dispatchEvent(new Event("guest-snippets-updated"));
      toast.success("Snippet eliminado");
      navigate("/snippet/guest");
    } else {
      toast.error("Snippet no encontrado");
    }
  };

  const metaData = {
    title: snippet?.title || "Zniply | Snippet Invitado",
    description: snippet?.description || "Visualizá un snippet creado como invitado",
    ogTitle: snippet?.title || "Zniply | Snippet Invitado",
    ogDescription: snippet?.description || "Visualizá un snippet creado como invitado",
    canonical: `https://zniply.space/snippet/guest/${snippetId}`
  };
  
  if (isLoading) return <Loader />
  if (snippet) 
    return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />

      <article className="w-full relative">
        <EditorReadonly content={snippet.code} />

        {
          <SnippetActions
            snippetId={snippet._id}
            isPending={false}
            isGuest={isGuest}
          />
        }

        <DeleteSnippetModal handleDeleteSnippet={handleDeleteSnippet} />
      </article>
    </>
  );
}
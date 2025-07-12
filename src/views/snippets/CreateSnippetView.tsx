import Loader from "@/components/Loader";
import TipTap from "@/components/TipTap";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import Seo from "@/extensions/Seo";
import { useLocation, useNavigate } from "react-router-dom";

type CreateSnippetViewProps = {
  isGuest?: boolean;
};

export default function CreateSnippetView({ isGuest }: CreateSnippetViewProps) {
  const { data: user, isLoading } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const isLogged = !!user;

  const metaData = {
    title: isGuest ? "Crear Un Nuevo Snippet como Invitado" : "Crear Un Nuevo Snippet",
    description: isGuest ? "Crear un nuevo snippet como invitado" : "Crear un nuevo snippet",
    ogTitle: isGuest ? "Crear un nuevo snippet como invitado" : "Crear un nuevo snippet",
    ogDescription: isGuest ? "Crear un nuevo snippet como invitado" : "Crear un nuevo snippet",
    canonical: isGuest ? "https://zniply.space/create-snippet/guest" : "https://zniply.space/create-snippet"
  }

  useEffect(() => {
    if (isLoading) return;

    // Si está logueado y está en /guest, redirigir
    if (isLogged && location.pathname.includes("/guest")) {
      navigate("/create-snippet", { replace: true });
    }

    // Si NO está logueado y está en /create-snippet normal, redirigir
    if (!isLogged && location.pathname === "/create-snippet") {
      navigate("/create-snippet/guest", { replace: true });
    }
  }, [isLogged, location.pathname, navigate, isLoading]);

  if (isLoading) return <Loader />
  return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />
    
      <div className="relative overflow-y-auto">
        <TipTap isGuest={isGuest} />
      </div>
    </>
  );
}

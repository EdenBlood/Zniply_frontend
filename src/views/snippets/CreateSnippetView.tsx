import Loader from "@/components/Loader";
import TipTap from "@/components/TipTap";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type CreateSnippetViewProps = {
  isGuest?: boolean;
};

export default function CreateSnippetView({ isGuest }: CreateSnippetViewProps) {
  const { data: user, isLoading } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const isLogged = !!user;

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
      <div className="relative overflow-y-auto">
        <TipTap isGuest={isGuest} />
      </div>
    </>
  );
}

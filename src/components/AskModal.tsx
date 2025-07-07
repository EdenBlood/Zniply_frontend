import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { Snippet } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SnippetService from "@/services/SnippetService";
import { toast } from "react-toastify";

type AskModalProps = {
  guestSnippets: Snippet[];
};

export default function AskModal({ guestSnippets }: AskModalProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(location.search),[location.search]);
  const ask: string | null = queryParams.get("ask");
  
  const alreadyAsked = window.localStorage.getItem("Zniply_Asked");

  const show:boolean = ask ? true : false;

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: SnippetService.createSnippet,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleSave = () => {
    Promise.all(
      guestSnippets.map((snippet) => mutateAsync({ formData: snippet }))
    )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["snippets"] });
        toast.success("Snippets guardados correctamente");
        window.localStorage.removeItem("Zniply_Guest_Snippets");
      })
      .catch(() => {
        toast.error("Error al guardar los snippets");
      });
    localStorage.setItem("Zniply_Asked", "true");
    navigate(location.pathname, { replace: true });
  };

  const handleDelete = () => {
    window.localStorage.removeItem("Zniply_Guest_Snippets");
    toast.success("Los Snippets de invitado fuero eliminados correctamente");
    navigate(location.pathname, { replace: true });
  };
  
  const handleOmit = () => {
    window.localStorage.setItem('Zniply_Asked', 'true')
    toast.info('Los snippets siguen como invitado')
    navigate(location.pathname, { replace: true });
  }
  
  if (alreadyAsked) return <Navigate to={location.pathname} />;
  if (ask)
    return (
      <>
        <Dialog
          open={show}
          onClose={() => navigate(location.pathname, { replace: true })}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
            <DialogPanel className="bg-container text-white p-6 rounded-xl space-y-6 max-w-2xl">
              <DialogTitle className="text-indigo-300 font-black text-4xl">
                Guardar Snippets
              </DialogTitle>
              <Description className="text-lg font-normal">
                ¿Quieres almacenar los Snippets creados como invitado en esta
                cuenta? o puedes dejarlos para otra cuenta. 
              </Description>
              <div className="flex gap-4">
                <button
                  className="py-1.5 px-3 text-md rounded-lg text-green-200 font-semibold text-center hover:bg-green-700 hover:text-green-200 disabled:bg-green-200 disabled:text-black disabled:hover:bg-green-200 cursor-pointer transition-colors duration-300"
                  onClick={handleSave}
                >
                  Guardarlos
                </button>

                <button
                  className="py-1.5 px-3 text-md rounded-lg text-red-200 font-semibold text-center hover:bg-red-700 hover:text-red-200 disabled:bg-red-200 disabled:text-black disabled:hover:bg-red-200 cursor-pointer transition-colors duration-300"
                  onClick={handleDelete}
                >
                  Eliminarlos
                </button>

                <button
                  className="py-1.5 px-3 text-md rounded-lg text-indigo-200 font-semibold text-center hover:bg-indigo-700 hover:text-indigo-200 disabled:bg-indigo-200 disabled:text-black disabled:hover:bg-indigo-200 cursor-pointer transition-colors duration-300"
                  onClick={handleOmit}
                >
                  No en esta cuenta
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}

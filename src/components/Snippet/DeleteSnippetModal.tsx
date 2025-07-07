import type { Snippet } from "@/types/index";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type DeleteSnippetModalProps = {
  handleDeleteSnippet: (snippetId: Snippet["_id"]) => void;
};

export default function DeleteSnippetModal({
  handleDeleteSnippet,
}: DeleteSnippetModalProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const snippetId: string | null = queryParams.get("delete-snippet");
  const show = snippetId ? true : false;

  if (snippetId)
    return (
      <>
        <Dialog
          open={show}
          onClose={() => navigate(location.pathname, { replace: true })}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
            <DialogPanel className="bg-container text-white p-6 rounded-xl space-y-6">
              <DialogTitle className="text-red-300 font-black text-4xl ">
                Eliminar Snippet
              </DialogTitle>
              <Description className="text-lg font-normal">
                ¿Estás seguro que deseas eliminar este snippet? Esta acción no
                se puede deshacer
              </Description>
              <div className="flex gap-4">
                <button
                  className="py-1.5 px-3 text-md rounded-lg text-red-200 font-semibold text-center hover:bg-red-700 hover:text-red-200 disabled:bg-red-200 disabled:text-black disabled:hover:bg-red-200 cursor-pointer transition-colors duration-300"
                  onClick={() => handleDeleteSnippet(snippetId)}
                >
                  Eliminar
                </button>
                <button
                  className="py-1.5 px-3 text-md rounded-lg text-indigo-200 font-semibold text-center hover:bg-indigo-700 hover:text-indigo-200 disabled:bg-indigo-200 disabled:text-black disabled:hover:bg-indigo-200 cursor-pointer transition-colors duration-300"
                  onClick={() =>
                    navigate(location.pathname, { replace: true })
                  }
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
}

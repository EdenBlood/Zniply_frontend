import SnippetService from "@/services/SnippetService";
import type { Snippet, SnippetData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Editor } from "@tiptap/react";
import { useNavigate } from "react-router-dom";
import { createId, getFirstLine } from "@/utils/index";
import { useAuthContext } from "@/hooks/useAuthContext";

type CreateSnippetFormProps = {
  editor: Editor;
  isGuest?: boolean
}

export default function CreateSnippetForm({ editor, isGuest }: CreateSnippetFormProps) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<{ title: SnippetData['title'] }>({ title: '' })

  const { data: user } = useAuthContext()

  const { mutate, isPending } = useMutation({
    mutationFn: SnippetService.createSnippet,
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({queryKey: ['snippets']})
      navigate(`/edit-snippet/user/${user?._id}/${data?.snippet._id}`)
    },
    onError: ({ message }) => {
      toast.error(message);
    }
  })
  
  function handleCreateSnippet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    //* Tomamos el titulo 
    let finalTitle = formData.title.trim()
    
    //* y si no existe colocamos la primera linea del Snippet.
    if (finalTitle === '') {
      const text = editor.getText();
      finalTitle = getFirstLine(text)
      setFormData({ title: finalTitle })
    }
    
    if (!finalTitle) {
      alert("Coloca un titulo al Snippet")
      return
    }
    
    const contentHTML = editor.getHTML();
    const contentText = editor.getText();
    
    const saveData = {
      title: finalTitle,
      description: contentText,
      code: contentHTML
    }
    
    if (isGuest) {
      let oldSnippets: Snippet[] = []
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
      if (storage) {
        oldSnippets = JSON.parse(storage)

        if (oldSnippets.length >= 3) {
          toast.error('Ya tienes 3 Snippets')
          return
        }
      }

      const saveDataGuest = {
        ...saveData,
        _id: createId(),
        user: 'guest'
      }

      const newSnippets = [...oldSnippets, saveDataGuest]
      window.localStorage.setItem('Zniply_Guest_Snippets', JSON.stringify(newSnippets))

      toast.success('Snippet creado correctamente')
      
      navigate(`/edit-snippet/guest/${saveDataGuest._id}`)
    } else {
      mutate({ formData: saveData })
    }
  }

  return (
    <form
      className="ml-6 flex flex-row w-full items-center gap-6 justify-between"
      onSubmit={handleCreateSnippet}
    >
      <input
        className="w-full py-1 focus:outline-0 "
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ title: e.target.value })}
        maxLength={48}
        placeholder="Titulo del Snippet..."
      />
      <input
        className="py-2 px-2.5 bg-blue-400 rounded-lg text-white hover:bg-blue-500 cursor-pointer transition-colors duration-200 disabled:hover:bg-blue-300 disabled:bg-blue-300 disabled:text-black"
        type="submit"
        value={isPending ? "Guardando..." : "Guardar"}
        disabled={isPending}
      />
    </form>
  )
}

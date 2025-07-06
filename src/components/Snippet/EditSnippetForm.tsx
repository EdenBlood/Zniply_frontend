import SnippetService from "@/services/SnippetService"
import type { Snippet, SnippetData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Editor } from "@tiptap/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type EditSnippetFormProps = {
  editor: Editor;
  contentApi: Snippet;
  isGuest?: boolean
}

export default function EditSnippetForm({ editor, contentApi, isGuest }: EditSnippetFormProps) {
  const params = useParams();
  const snippetId = params.snippetId!
  
  const [formData, setFormData] = useState<{ title: SnippetData['title'] }>({ title: contentApi.title })

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: SnippetService.updateSnippet,
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({queryKey: ['snippet', snippetId]})
      queryClient.invalidateQueries({queryKey: ['editSnippet', snippetId]})
      queryClient.invalidateQueries({queryKey: ['snippets']})
    },
    onError: ({ message }) => {
      toast.error(message);
    }
  })

  function handleEditSnippet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //* Tomamos el titulo 
    let finalTitle = formData.title.trim()

    //* y si no existe colocamos la primera linea del Snippet.
    if (finalTitle === '') {
      finalTitle = contentApi.title
      setFormData({title: contentApi.title})
    }

    const contentHTML = editor.getHTML();
    const contentText = editor.getText();

    const saveData = {
      title: finalTitle,
      description: contentText,
      code: contentHTML
    }

    if (isGuest) {
      const saveDataGuest = {
        ...saveData,
        _id: snippetId,
        user: 'guest'
      }
      
      const storage = window.localStorage.getItem('Zniply_Guest_Snippets')
      if ( storage ) {
        const snippets = JSON.parse(storage);
        const updateSnippet = snippets.reduce((acc: Snippet[], snippet: Snippet) => {
          if (snippet._id === snippetId){ 
            return [...acc, saveDataGuest]
          };
          return [...acc, snippet]
        }, [] as Snippet[])
        
        window.localStorage.setItem('Zniply_Guest_Snippets', JSON.stringify(updateSnippet))
        toast.success('Actualizado correctamente')
      }
    } else {
      mutate({ formData: saveData, snippetId })
    }
  }

  return (
    <form
      className="ml-6 flex flex-row w-full items-center gap-6 justify-between"
      onSubmit={handleEditSnippet}
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
        value={isPending ? "Guardando Cambios..." : "Guardar"}
        disabled={isPending}
      />
    </form>
  )
}

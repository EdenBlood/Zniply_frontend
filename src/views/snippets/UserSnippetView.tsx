
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnippetService from '@/services/SnippetService'
import { toast } from 'react-toastify';
import type { Snippet } from '@/types/index';
import useGetSnippet from '@/hooks/useGetSnippet';
import EditorReadonly from '@/components/EditorReadonly';
import SnippetActions from '@/components/Snippet/SnippetActions';
import DeleteSnippetModal from '@/components/Snippet/DeleteSnippetModal';


export default function UserSnippetView() {
  const params = useParams();
  const snippetId: string = params.snippetId!;
  const userId: string = params.userId!; 
  const navigate = useNavigate()
  const queryClient = useQueryClient()


  
  //* Traigo el snippet y si es mio
  const { snippet, isError, isOwnerSnippet } = useGetSnippet(snippetId);

  //* Elimina el Snippet
  const { mutate, isPending } = useMutation({
    mutationFn: SnippetService.deleteSnippet,
    onSuccess: (msg) => {
      toast.success(msg)
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', userId] })
      queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] })
      navigate(`/snippet/user/${userId}`)
    },
    onError: ({ message }) => {
      toast.error(message)
    }
  })

  //* onCLick Eliminar Snippet
  const handleDeleteSnippet = (snippetId: Snippet['_id']) => {
    mutate({ snippetId });
  }

  if (isError) {
    toast.error('El snippet no existe')
    return <Navigate to={"/snippet"} />
  }
  if (snippet) return (
    <>
      <article className='w-full relative'>
        <EditorReadonly content={snippet.code} />

        {isOwnerSnippet && (
          <SnippetActions
            snippetId={snippet._id}
            isPending={isPending}
          />
        )}
      </article>

      <DeleteSnippetModal handleDeleteSnippet={handleDeleteSnippet} />
    </>
  )
  // return <Navigate to={`/snippet/user/${userId}`}/>
}

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnippetService from '@/services/SnippetService';
import { toast } from 'react-toastify';
import type { Snippet } from '@/types/index';
import useGetSnippet from '@/hooks/useGetSnippet';
import EditorReadonly from '@/components/EditorReadonly';
import SnippetActions from '@/components/Snippet/SnippetActions';
import DeleteSnippetModal from '@/components/Snippet/DeleteSnippetModal';
import Loader from '@/components/Loader';
import Seo from '@/extensions/Seo';
import SnippetLike from '@/components/Snippet/SnippetLike';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function FavoriteSnippetView() {
  const params = useParams();
  const snippetId: string = params.snippetId!;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading: authLoading } = useAuthContext();

  //* Traigo el snippet y si es mio
  const { snippet, isError, isOwnerSnippet, isLoading: snippetLoading } = useGetSnippet(snippetId);

  //* Elimina el Snippet
  const { mutate, isPending } = useMutation({
    mutationFn: SnippetService.deleteSnippet,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      queryClient.invalidateQueries({ queryKey: ['snippets', user?._id] });
      queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] });
      queryClient.invalidateQueries({ queryKey: ['snippetsLiked'] });
      navigate(`/snippet/favorite`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  //* onCLick Eliminar Snippet
  const handleDeleteSnippet = (snippetId: Snippet['_id']) => {
    mutate({ snippetId });
  };

  const metaData = {
    title: snippet?.title || 'Zniply | Snippet',
    description: snippet?.description || 'Visualizá un snippet creado',
    ogTitle: snippet?.title || 'Visualizá un snippet creado',
    ogDescription: snippet?.description || 'Visualizá un snippet creado',
    canonical: `https://zniply.space/snippet/favorite/${snippetId}`,
  };

  if (snippetLoading || authLoading) return <Loader />;
  if (!user) return <Navigate to={`/snippet/guest`} replace />;
  if (isError) return <Navigate to={`/snippet/favorite`} replace />;
  if (snippet)
    return (
      <>
        <Seo
          title={metaData.title}
          description={metaData.description}
          ogTitle={metaData.ogTitle}
          ogDescription={metaData.ogDescription}
          canonical={metaData.canonical}
        />

        <article className="w-full relative">
          <EditorReadonly content={snippet.code} />

          <SnippetLike snippet={snippet} />

          {isOwnerSnippet && <SnippetActions snippetId={snippet._id} isPending={isPending} />}
        </article>

        <DeleteSnippetModal handleDeleteSnippet={handleDeleteSnippet} />
      </>
    );
}

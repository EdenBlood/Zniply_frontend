import Loader from '@/components/Loader';
import SnippetNavCard from '@/components/Snippet/SnippetNavCard';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import LikeService from '@/services/LikeService';

export default function FavoriteSnippetSidebar() {
  const { data: user, isLoading } = useAuthContext();

  const { data: snippets, isLoading: snippetLoading } = useQuery({
    queryKey: ['snippetsLiked'],
    queryFn: LikeService.getAllSnippetLiked,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || snippetLoading) return <Loader />;
  if (!user) return <Navigate to={`/snippet/guest`} replace />;
  return (
    <>
      <aside className="w-88 sticky bg-container/50 rounded-xl h-min max-h-full overflow-y-auto overflow-hidden">
        <div className="sticky top-0 left-0 w-full h-3 bg-gradient-to-b from-black/20 to-transparent z-10" />
        <nav className="p-4 -my-4 flex flex-col gap-3">
          {snippets?.length ? (
            <SnippetNavCard snippets={snippets} favorite={true} />
          ) : (
            <div className="text-sm p-2 rounded-md text-slate-50 text-center">
              <h3 className="text-sm font-bold text-pretty break-words w-full">
                No tienes Snippets favoritos
              </h3>
              <p className="font-normal text-xs overflow-hidden opacity-90 w-full">
                Agrega tus favoritos para verlos aquí
              </p>
            </div>
          )}
        </nav>
        <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/20 to-transparent z-10" />
      </aside>

      <main className="w-full overflow-y-auto rounded-xl">
        <Outlet />
      </main>
    </>
  );
}

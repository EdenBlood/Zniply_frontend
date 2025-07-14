import useGetAllUserSnippets from '@/hooks/useGetAllUserSnippets';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader';
import SnippetNavCard from './SnippetNavCard';

type OtherUserSideBarProps = {
  userId: string;
};

export default function OtherUserSideBar({ userId }: OtherUserSideBarProps) {
  const { user, snippets, isLoading, isError } = useGetAllUserSnippets(userId);

  if (isLoading) return <Loader />;
  if (isError || !user) return <Navigate to={`/snippet/guest`} />;
  return (
    <aside className="w-88 sticky bg-container/50 rounded-xl h-min max-h-full overflow-y-auto overflow-hidden">
      <div className="sticky top-0 left-0 w-full h-3 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <nav className="p-4 -my-4 flex flex-col gap-3">
        <div className="p-2 rounded-md w-full max-w-full bg-slate-50 ">
          <p className="text-accent-violet text-sm font-bold text-pretty break-words w-full">
            {user.name} <span className="text-black">Snippet's</span>
          </p>
        </div>

        {snippets.length > 0 ? (
          <SnippetNavCard snippets={snippets} />
        ) : (
          <div className="font-normal text-sm p-2 rounded-md text-slate-50 text-center">
            <h3 className="text-sm font-bold text-pretty break-words w-full">
              El usuario aún no tiene Snippets
            </h3>
          </div>
        )}
      </nav>
      <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black/20 to-transparent z-10" />
    </aside>
  );
}

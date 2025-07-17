import { useAuthContext } from '@/hooks/useAuthContext';
import LikeService from '@/services/LikeService';
import type { Snippet } from '@/types/index';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type SnippetLikeProps = {
  snippet: Snippet;
};

export default function SnippetLike({ snippet }: SnippetLikeProps) {
  const queryClient = useQueryClient();

  const { data: getLiked, isLoading } = useQuery({
    queryFn: () => LikeService.getSnippetLiked({ snippetId: snippet._id }),
    queryKey: ['like', snippet._id],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [liked, setLiked] = useState<boolean>(false);
  useEffect(() => {
    if (typeof getLiked === 'boolean') {
      setLiked(getLiked);
    }
  }, [getLiked]);

  const { mutate, isPending } = useMutation({
    mutationFn: LikeService.likeSnippet,
    onSuccess: (data) => {
      toast.success(data?.msg);
      const newLiked = Boolean(data?.liked);
      setLiked(newLiked);

      queryClient.invalidateQueries({ queryKey: ['snippetsLiked'] });

      // Establezco el nuevo valor de liked en la cache sin hacer un nuevo fetching
      queryClient.setQueryData(['like', snippet._id], newLiked);

      // Actualizo el contador de likes sin hacer un nuevo fetching
      queryClient.setQueryData(['snippet', snippet._id], (prevSnippet: Snippet) => {
        if (!prevSnippet) return prevSnippet;

        const updatedLikedCount = newLiked ? prevSnippet.likeCount + 1 : prevSnippet.likeCount - 1;

        return {
          ...prevSnippet,
          likeCount: updatedLikedCount,
        };
      });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { data: user } = useAuthContext();

  const handleLike = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para dar Bombillas');
      return;
    }
    mutate({ snippetId: snippet._id });
  };

  return (
    <div className="absolute top-3 right-20 z-50">
      <button
        disabled={isLoading || isPending}
        className={`bg-container font-semibold text-white p-1 px-2 rounded-full flex items-center transform duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed gap-2 ${
          liked ? 'text-accent-yellow' : 'text-slate-300'
        } ${!user ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleLike}
      >
        {snippet.likeCount}
        <LightBulbIcon
          strokeWidth={2}
          className={`size-6 disabled:text-slate-500 ${
            liked ? ' text-accent-yellow' : 'text-slate-300'
          }`}
        />
      </button>
    </div>
  );
}

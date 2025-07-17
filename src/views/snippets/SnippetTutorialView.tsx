import EditorReadonly from '@/components/EditorReadonly';
import Loader from '@/components/Loader';
import { useAuthContext } from '@/hooks/useAuthContext';
import Seo from '@/extensions/Seo';
import getTutorial from '@/utils/tutorials';

interface SnippetTutorialViewProps {
  type: 'snippet' | 'favoriteTutorial';
}

export default function SnippetTutorialView({ type }: SnippetTutorialViewProps) {
  const { data: user, isLoading: authLoading } = useAuthContext();

  const tutorial = getTutorial(type);

  const metaData = {
    title: 'Tutorial',
    description: 'Tutorial de como usar Zniply, crea tu propio Snippet',
    ogTitle: 'Tutorial',
    ogDescription: 'Tutorial de como usar Zniply, crea tu propio Snippet',
    canonical:
      type === 'favoriteTutorial'
        ? `https://zniply.space/snippet/favorite`
        : user
        ? `https://zniply.space/snippet/${user._id}`
        : `https://zniply.space/snippet/guest`,
  };

  if (authLoading) return <Loader />;
  return (
    <>
      <Seo
        title={metaData.title}
        description={metaData.description}
        ogTitle={metaData.ogTitle}
        ogDescription={metaData.ogDescription}
        canonical={metaData.canonical}
      />

      <article className="w-full">
        <EditorReadonly content={tutorial} />
      </article>
    </>
  );
}

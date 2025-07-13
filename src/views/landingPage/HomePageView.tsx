import Loader from '@/components/Loader';
import { useAuthContext } from '@/hooks/useAuthContext';
import Seo from '@/extensions/Seo';
import Table from '@/components/HomePage/Table';
import Example from '@/components/HomePage/Example';
import WhyUseIt from '@/components/HomePage/WhyUseIt';
import Hero from '@/components/HomePage/Hero';

export default function HomePageView() {
  const { data: user, isLoading: authLoading } = useAuthContext();

  const isLogged = !!user;

  const metaData = {
    title: 'Organiza y comparte snippets fácilmente',
    description:
      'Zniply es la mejor herramienta para guardar, organizar y compartir snippets de código.',
    ogTitle: 'Zniply | Organiza y comparte snippets fácilmente',
    ogDescription:
      'Zniply es la mejor herramienta para guardar, organizar y compartir snippets de código.',
    canonical: 'https://zniply.space/',
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

      <Hero isLogged={isLogged} user={user?._id} />

      <WhyUseIt />

      <Example />

      <Table />
    </>
  );
}

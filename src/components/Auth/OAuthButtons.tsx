import googleIcon from '@/assets/googleIcon.svg';
import gitHubIcon from '@/assets/githubIcon.svg';

type Props = {
  text: string;
};

export default function OAuthButtons({ text }: Props) {
  const API = import.meta.env.VITE_API_URL;

  return (
    <>
      <div className="flex flex-col gap-2 w-full px-5">
        <button
          className="w-full text-lg font-semibold px-4 text-center py-2 rounded-lg hover:rounded-3xl border-2 border-google hover:border-google-hover bg-transparent text-google hover:text-google-hover transform duration-200 cursor-pointer shadow-xl drop-shadow-lg flex items-center justify-center gap-2 group"
          onClick={() => {
            window.location.href = `${API}/oauth/google`;
          }}
        >
          <img className="size-6" src={googleIcon} alt="googleIcon" />
          <p>{text} con Google</p>
        </button>
        <button
          className="w-full text-lg font-semibold px-4 text-center py-2 rounded-lg hover:rounded-3xl border-2 border-github hover:border-github-hover bg-transparent text-github hover:text-github-hover transform duration-200 cursor-pointer shadow-xl drop-shadow-lg flex items-center justify-center gap-2 group"
          onClick={() => {
            window.location.href = `${API}/oauth/github`;
          }}
        >
          <img className="size-6" src={gitHubIcon} alt="gitHubIcon" />
          <p>{text} con GitHub</p>
        </button>
      </div>
    </>
  );
}

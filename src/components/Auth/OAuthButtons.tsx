export default function OAuthButtons() {
  const API = import.meta.env.VITE_API_URL;

  return (
    <>
      <div className="flex flex-col gap-2 w-full px-4">
        <button
          className="w-full text-lg font-semibold px-4 text-center py-2 rounded-xl bg-container/80 hover:bg-container text-slate-100 transition-colors duration-300 cursor-pointer shadow-xl"
          onClick={() => {
            window.location.href = `${API}/oauth/google`;
          }}
        >
          Inicia sesión con Google{/* TODO: logo de google */}
        </button>
        <button
          className="w-full text-lg font-semibold px-4 text-center py-2 rounded-xl bg-container/80 hover:bg-container text-slate-100 transition-colors duration-300 cursor-pointer shadow-xl"
          onClick={() => {
            window.location.href = `${API}/oauth/github`;
          }}
        >
          Inicia sesión con GitHub{/* TODO: logo de github */}
        </button>
      </div>
    </>
  );
}

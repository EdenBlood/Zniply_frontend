import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  CodeBracketIcon,
  EyeIcon,
  FolderIcon,
  LockOpenIcon,
  ShareIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import EditorReadonly from "@/components/EditorReadonly";

export default function HomePageView() {
  const { data: user, isLoading: authLoading } = useAuthContext();

  const isLogged = !!user;

  const content = `
  <h2>Snippet de ejemplo (React + TypeScript)</h2>

  <pre><code class="language-tsx">import { useState, useEffect } from 'react'

type User = {
  id: number
  name: string
}

export default function App() {
  const [user, setUser] = useState&lt;User | null&gt;(null)

  useEffect(() =&gt; {
    fetch('/api/user')
      .then(res =&gt; res.json())
      .then(data =&gt; setUser(data))
  }, [])

  return &lt;div&gt;{user ? \`Hola \${user.name}\` : 'Cargando...'}&lt;/div&gt;
}</code></pre>
`
  
  if (authLoading) return <Loader />;
  return (
    <>
      <main className="w-6xl mx-auto pt-18 h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-8xl title font-bold text-slate-50 text-center">
          Crea, Comparte y Almacena Snippets
        </h1>
        <p className="text-2xl title text-center text-white font-normal">
          Zniply es una plataforma donde puedes crear bloques de código para
          compartir con otras personas, que son difíciles de memorizar o
          simplemente para lo que quieras.
        </p>
        <p className="text-2xl title text-center text-white font-normal">
          Puedes crear hasta 3 snippets sin crear una cuenta{" "}
          <Link
            className="text-accent-yellow"
            to={isLogged ? `/snippet/user/${user._id}` : `/snippet/guest`}
          >
            Haciendo click aquí
          </Link>
        </p>
      </main>

      <section className=" bg-slate-50/90 w-full shadow-lg">
        <div className="w-6xl mx-auto py-8 space-y-8">
          <h1 className="text-5xl text-center font-bold title text-accent/80">
            ¿Por qué usar Zniply?
          </h1>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
              <div className="flex flex-row gap-3">
                <ClockIcon className="size-10" />
                <h2 className="text-4xl title font-bold">Rápido</h2>
              </div>
              <p className="text-lg font-normal">
                Crear y compartir snippets en segundos, sin necesidad de
                registrarte.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
              <div className="flex flex-row gap-3">
                <LockOpenIcon className="size-10" />
                <h2 className="text-4xl title font-bold">Accesible</h2>
              </div>
              <p className="text-lg font-normal">
                Hasta 3 snippets sin cuenta. Ideal para compartir código en una
                entrevista, entre colegas o en tus apuntes.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
              <div className="flex flex-row gap-3">
                <FolderIcon className="size-10" />
                <h2 className="text-4xl title font-bold">Organizado</h2>
              </div>
              <p className="text-lg font-normal">
                Si te registrás, podés gestionar tus snippets, editarlos,
                categorizarlos y compartirlos fácilmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen w-full items-center">
        <div className="w-6xl mx-auto py-6 space-y-6 h-full flex flex-col justify-center gap-12">
          <h1 className="text-center font-bold text-slate-50 title text-5xl">
            Características clave
          </h1>
          <div className="w-full flex flex-row items-center gap-20">
            <EditorReadonly content={content} />

            <ul className="text-slate-50 list-disc space-y-3">
              <li className="text-md font-normal title">
                <CodeBracketIcon className="size-7 inline mx-2" /> Crear
                snippets en varios lenguajes.
              </li>
              <li className="text-md font-normal title">
                <EyeIcon className="size-7 inline mx-2" /> Formato con resaltado
                de sintaxis.
              </li>
              <li className="text-md font-normal title">
                <TagIcon className="size-7 inline mx-2" /> Categorías y
                etiquetas.
              </li>
              <li className="text-md font-normal title">
                <ShareIcon className="size-7 inline mx-2" /> Enlaces directos
                para compartir.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

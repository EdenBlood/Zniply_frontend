import { CodeBracketIcon, EyeIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import EditorReadonly from '../EditorReadonly';

export default function Example() {
  const content = `
  <h1><strong>Snippet de ejemplo (React + TypeScript)</strong></h1>

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
`;

  return (
    <section className="min-h-screen w-full items-center">
      <div className="w-6xl mx-auto pt-16 pb-6 space-y-6 h-full flex flex-col justify-center gap-12">
        <h1 className="text-center font-bold drop-shadow-md drop-shadow-slate-200/50 text-slate-50 title text-5xl">
          Características clave
        </h1>
        <div className="w-full flex flex-row items-center gap-20">
          <EditorReadonly content={content} />

          <ul className="text-slate-50 list-disc space-y-3">
            <li className="text-md font-normal title">
              <CodeBracketIcon className="size-7 inline mx-2" /> Crear snippets en varios lenguajes.
            </li>
            <li className="text-md font-normal title">
              <EyeIcon className="size-7 inline mx-2" /> Formato con resaltado de sintaxis.
            </li>
            <li className="text-md font-normal title">
              <TagIcon className="size-7 inline mx-2" /> Categorías y etiquetas.
            </li>
            <li className="text-md font-normal title">
              <ShareIcon className="size-7 inline mx-2" /> Enlaces directos para compartir.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

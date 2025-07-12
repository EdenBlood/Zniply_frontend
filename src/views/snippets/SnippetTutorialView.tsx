import EditorReadonly from "@/components/EditorReadonly";
import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import Seo from "@/extensions/Seo";


export default function SnippetTutorialView() {
  const { data: user, isLoading: authLoading } = useAuthContext();

  const tutorial = `
<h1><strong>📌 Bienvenido a tu espacio de snippets</strong></h1>
<p></p>
<p>Esta aplicación web está pensada para <strong>guardar, organizar y visualizar fragmentos de código</strong> de forma rápida, clara y accesible desde cualquier dispositivo.</p>
<p></p>
<p>Podés escribir en varios lenguajes de programación y automáticamente se <strong>resaltará la sintaxis</strong> con bloques de código personalizados como este:</p>
<p></p>
<pre><code class="language-js">
const mensaje = "Hola mundo";
console.log(mensaje);
</code></pre>
<p></p>
<p>Además, tenés la posibilidad de:</p>
<ul>
  <li>🔖 Agregar <strong>títulos</strong> y <strong>descripciones</strong> para identificar cada snippet fácilmente.</li>
  <li>🖼️ Insertar <strong>imágenes desde internet</strong> para acompañar tus notas o ejemplos.</li>
  <li>🔗 Usar <a href="https://developer.mozilla.org/" target="_blank">enlaces con anclaje</a> para dirigir a documentación o recursos externos.</li>
</ul>
<p></p>
<p>Este es tu lugar para guardar desde <em>atajos útiles</em> hasta <em>funciones completas</em> que no querés volver a escribir desde cero.</p>
<p></p>
<p><strong>¡Empezá a crear tu biblioteca personal de snippets hoy!</strong></p>`;

  const metaData = {
    title: "Tutorial",
    description: "Tutorial de como usar Zniply, crea tu propio Snippet",
    ogTitle: "Tutorial",
    ogDescription: "Tutorial de como usar Zniply, crea tu propio Snippet",
    canonical: user ? `https://zniply.space/snippet/${user._id}` : `https://zniply.space/snippet/guest`
  }

  if (authLoading) return <Loader />
  return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />

      <article className="w-full">
        <EditorReadonly content={tutorial} />
      </article>
    </>
  );
}

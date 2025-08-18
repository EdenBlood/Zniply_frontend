export default function getTutorial(type: 'snippet' | 'favoriteTutorial'): string {
  const tutorials = {
    snippet: `
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
<p><strong>¡Empezá a crear tu biblioteca personal de snippets hoy!</strong></p>`,
    favoriteTutorial: `
<h1><strong>⭐ Bienvenido a tus favoritos</strong></h1>
<p></p>
<p>En este espacio podés <strong>guardar los snippets más importantes</strong>, aquellos que usás con frecuencia o que considerás esenciales para tu trabajo.</p>
<p></p>
<p>La sección de favoritos está pensada para que <strong>encuentres todo al instante</strong> sin tener que buscar entre tu biblioteca completa.</p>
<p></p>
<p>Podés:</p>
<ul>
  <li>📂 <strong>Organizar</strong> tus fragmentos destacados.</li>
  <li>⚡ Acceder de forma <strong>rápida</strong> a los que más utilizás.</li>
  <li>📝 Editar o actualizar fácilmente su contenido.</li>
</ul>
<p></p>
<p>Este es tu lugar para <em>lo esencial</em>, lo que realmente hace tu flujo de trabajo más ágil y productivo.</p>
<p></p>
<p><strong>Guardá tus mejores snippets acá y tenelos siempre a mano.</strong></p>
     `,
  };

  return tutorials[type];
}

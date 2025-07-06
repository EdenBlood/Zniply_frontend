export function createSnippetTutorial() : string {
  return `<h1><strong>Bienvenido a tu editor de Snippets 🧠</strong></h1>
<p>Este es un espacio donde podés guardar fragmentos de código, notas técnicas y atajos útiles. Para comenzar, escribí directamente en el editor o usá los siguientes atajos:</p>

<h3>💡 Atajos útiles del teclado:</h3>
<ul>
  <li><strong>Ctrl</strong> + <strong>B</strong>: Negrita</li>
  <li><strong>Ctrl</strong> + <strong>I</strong>: Cursiva</li>
  <li><strong>Ctrl</strong> + <strong>U</strong>: Subrayado</li>
  <li><strong>Ctrl</strong> + <strong>E</strong>: Código (Code Block)</li>
</ul>

<h3>⌨️ Cómo crear un bloque de código:</h3>
<p>Seleccioná un fragmento y hacé clic en el ícono de "code" en la barra de herramientas, o usá el atajo <code>Ctrl + E</code>. Tu código se verá así:</p>

<pre><code class="language-javascript">
// Esto es un bloque de código
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
</code></pre>

<h3>🌐 Insertar un link o imagen:</h3>
<p>Seleccioná texto y hacé clic en el ícono de enlace 🔗 para agregar una URL. También podés insertar una imagen desde internet con el botón correspondiente.</p>

<p>Probá crear tu primer snippet haciendo clic <a href="/create-snippet" class="text-accent">aquí</a> o desde la opción del menú izquierdo.</p>`
}
import Seo from '@/extensions/Seo';

export default function PrivacyView() {
  return (
    <>
      <Seo
        title="Política de Privacidad"
        description="Política de Privacidad | Zniply"
        ogTitle="Política de Privacidad | Zniply"
        ogDescription="Conocé cómo manejamos tus datos personales en Zniply."
        canonical="https://zniply.space/privacy"
      />

      <main className="w-6xl mx-auto py-18 pb-10 min-h-screen flex flex-col items-center justify-center gap-12">
        <h1 className="text-8xl title font-bold text-slate-50 drop-shadow-md drop-shadow-slate-200/50 text-center">
          Política de Privacidad
        </h1>

        <div className="w-4xl bg-slate-500/10 p-8 rounded-md text-slate-50 space-y-6">
          <section>
            <h2 className="text-3xl font-bold">1. Información general</h2>
            <p className="text-md text-slate-200">
              En Zniply valoramos tu privacidad. Esta política describe qué datos recopilamos, cómo
              los usamos y qué opciones tenés al respecto.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">2. Datos que recopilamos</h2>
            <ul className="list-disc ml-6 text-md text-slate-200 space-y-1">
              <li>
                Snippets creados por el usuario (almacenados en tu navegador o en nuestra base de
                datos si estás registrado).
              </li>
              <li>Datos mínimos de cuenta: email y nombre de usuario (solo si te registrás).</li>
              <li>
                No recopilamos contraseñas directamente: se gestionan de forma segura y cifrada.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold">3. Uso de los datos</h2>
            <p className="text-md text-slate-200">
              Los datos se usan exclusivamente para brindarte el servicio: guardar, organizar y
              compartir tus snippets. No vendemos ni compartimos tus datos con terceros.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">4. Cookies y almacenamiento</h2>
            <p className="text-md text-slate-200">
              Usamos almacenamiento local en tu navegador para guardar snippets como invitado. No
              usamos cookies de seguimiento de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">5. Seguridad</h2>
            <p className="text-md text-slate-200">
              Protegemos tus datos utilizando prácticas estándar de seguridad. Sin embargo, ningún
              sistema es 100% infalible.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">6. Tus derechos</h2>
            <p className="text-md text-slate-200">
              Podés solicitar la eliminación de tu cuenta y de todos tus datos enviando un email a{' '}
              <a
                className="text-accent hover:text-purple-300 transition-colors duration-300"
                href="mailto:soporte@zniply.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                soporte@zniply.space
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">7. Cambios en esta política</h2>
            <p className="text-md text-slate-200">
              Esta política puede ser actualizada. Te recomendamos revisarla periódicamente. Última
              actualización: Julio 2025.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

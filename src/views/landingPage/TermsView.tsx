import Seo from '@/extensions/Seo';

export default function TermsView() {
  return (
    <>
      <Seo
        title="Términos y Condiciones | Uso de Zniply"
        description="Conocé los términos de uso y condiciones legales para utilizar Zniply, la herramienta para guardar y compartir snippets de código."
        ogTitle="Términos y Condiciones | Zniply"
        ogDescription="Conocé los términos de uso y condiciones legales para utilizar Zniply."
        canonical="https://zniply.space/terms"
      />
      <main className="w-6xl mx-auto py-18 pb-10 min-h-screen flex flex-col items-center justify-center gap-12">
        <h1 className="text-8xl title font-bold text-slate-50 drop-shadow-md drop-shadow-slate-200/50 text-center">
          Términos y Condiciones
        </h1>

        <div className="w-4xl bg-slate-500/10 p-8 rounded-md text-slate-50">
          <div className="space-y-2">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">1. Aceptación de los Términos</h2>
              <p className="text-md text-slate-200">
                Al acceder y utilizar Zniply (https://zniply.space), aceptás cumplir con estos
                Términos y Condiciones. Si no estás de acuerdo, por favor no utilices la plataforma.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">2. Descripción del Servicio</h2>
              <p className="text-md text-slate-200">
                Zniply permite crear, guardar, organizar y compartir fragmentos de código
                ("snippets"). Podés usarlo como invitado (hasta 3 snippets) o registrarte para
                obtener más funcionalidades.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">3. Uso Aceptable</h2>
              <ul className="list-disc ml-6">
                <li>No subir contenido ilegal, ofensivo o que infrinja derechos de terceros.</li>
                <li>No usar Zniply para actividades maliciosas, spam o hacking.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">4. Privacidad</h2>
              <p className="text-md text-slate-200">
                Zniply no recopila datos sensibles. Usamos almacenamiento local y opcionalmente
                datos de registro para gestionar snippets de usuarios registrados. No compartimos tu
                información con terceros.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">5. Limitación de Responsabilidad</h2>
              <p className="text-md text-slate-200">
                Zniply se ofrece tal como está, sin garantías. No garantizamos que el servicio esté
                siempre disponible o libre de errores.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">6. Modificaciones</h2>
              <p className="text-md text-slate-200">
                Podemos actualizar estos Términos y Condiciones en cualquier momento. Te
                recomendamos revisarlos periódicamente.
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold">7. Contacto</h2>
              <p className="text-md text-slate-200">
                Para cualquier duda, podés escribirnos a{' '}
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

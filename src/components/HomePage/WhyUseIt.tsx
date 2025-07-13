import { ClockIcon, FolderIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function WhyUseIt() {
  return (
    <section className=" bg-slate-50/90 w-full shadow-lg">
      <div className="w-6xl mx-auto py-8 space-y-8">
        <h1 className="text-5xl text-center font-bold title text-accent/80 drop-shadow-lg">
          ¿Por qué usar Zniply?
        </h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
            <div className="flex flex-row gap-3">
              <ClockIcon className="size-10" />
              <h2 className="text-4xl title font-bold">Rápido</h2>
            </div>
            <p className="text-lg font-normal">
              Crear y compartir snippets en segundos, sin necesidad de registrarte.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
            <div className="flex flex-row gap-3">
              <LockOpenIcon className="size-10" />
              <h2 className="text-4xl title font-bold">Accesible</h2>
            </div>
            <p className="text-lg font-normal">
              Hasta 3 snippets sin cuenta. Ideal para compartir código en una entrevista, entre
              colegas o en tus apuntes.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-center items-center text-black flex-1">
            <div className="flex flex-row gap-3">
              <FolderIcon className="size-10" />
              <h2 className="text-4xl title font-bold">Organizado</h2>
            </div>
            <p className="text-lg font-normal">
              Si te registrás, podés gestionar tus snippets, editarlos, categorizarlos y
              compartirlos fácilmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Table() {
  return (
    <section className="w-full">
      <div className="w-6xl mx-auto py-16 space-y-8 h-full flex flex-col">
        <h1 className="title text-accent drop-shadow-md drop-shadow-accent-violet/50 text-center font-bold text-5xl">
          Modo invitado vs. usuario registrado
        </h1>

        <div className="bg-slate-900/90 rounded-3xl p-8">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="text-slate-50 py-4 font-bold">Característica</th>
                <th className="text-slate-50 py-4 font-bold">Invitado</th>
                <th className="text-slate-50 py-4 font-bold">Registrado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="text-slate-400 py-3">Crear Snippets</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <p className="text-sm">3</p>
                    </div>
                    <p className="text-white">(por usuario)</p>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <p className="text-2xl">∞</p>
                    </div>
                    <p className="text-white">(Ilimitados)</p>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="text-slate-400 py-3">Editar Snippets</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="text-slate-400 py-3">Organizar y Buscar Snippets</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="text-slate-400 py-3">Seguridad y Backup</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-red-500 rounded-full flex items-center justify-center">
                      <XMarkIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-slate-400 py-3">Compartir Snippets</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-red-500 rounded-full flex items-center justify-center">
                      <XMarkIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <div className="size-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="text-white size-5" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

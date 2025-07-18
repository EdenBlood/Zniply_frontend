import type { Snippet } from '@/types/index';
import { dateFormat } from '@/utils/index';

type SnippetDateProps = {
  snippet: Snippet;
};

export default function SnippetDate({ snippet }: SnippetDateProps) {
  return (
    <div className="absolute flex flex-row gap-2 bottom-2 right-2 z-50">
      <p className="text-xs text-container font-semibold">
        Creado el <span className="text-accent">{dateFormat(snippet.createdAt)}</span>
      </p>
      <p className="text-xs text-container font-semibold">
        Actualizado el <span className="text-accent">{dateFormat(snippet.updatedAt)}</span>
      </p>
    </div>
  );
}

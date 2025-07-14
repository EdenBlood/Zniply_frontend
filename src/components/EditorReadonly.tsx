import StarterKit from '@tiptap/starter-kit';
import CustomCodeBlock from '@/extensions/CustomCodeBlock';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import LinkTipTap from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { useEffect } from 'react';
import Loader from './Loader';

type EditorReadonlyProps = {
  content: string;
};

export default function EditorReadonly({ content }: EditorReadonlyProps) {
  //* Configuración del editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        paragraph: false,
      }),
      CustomCodeBlock,
      Underline,
      Paragraph,
      Image,
      LinkTipTap.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: 'https',
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    editable: false,
  });

  //* Coloca el contenido en el editor
  useEffect(() => {
    if (editor) {
      Promise.resolve().then(() => {
        editor.commands.setContent(content);
      });
    }
  }, [editor, content]);

  if (!editor) return <Loader />;

  return (
    <EditorContent
      className="editor-view bg-gray-ancient w-full h-max min-h-80 rounded-lg"
      editor={editor}
    />
  );
}

import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import Underline from '@tiptap/extension-underline';
import Paragraph from '@tiptap/extension-paragraph';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from '@/components/ToolBar';
import CustomCodeBlock from '@/extensions/CustomCodeBlock';
import { createSnippetTutorial } from '@/data/tutorial';
import type { Commands, Snippet } from '@/types/index';
import { useEffect } from 'react';
import Loader from './Loader';

type TipTapProps = {
  contentApi?: Snippet,
  isGuest?: boolean
}

export default function TipTap({ contentApi, isGuest }: TipTapProps) {
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
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: 'https',
        HTMLAttributes: {
          target: "_blank",
          rel: 'noopener noreferrer'
        }
      })],
  })!;

  useEffect(() => {
    if (editor && contentApi?.code) {
      Promise.resolve().then(() => {
        editor.commands.setContent(contentApi.code);
      })
    } else {
      Promise.resolve().then(() => {
        editor.commands.setContent(createSnippetTutorial())
      })
    }
  }, [editor, contentApi]);

  const editorState = useEditorState({
    editor,
    selector: (context) => {
      return {
        isBold: context.editor.isActive('bold'),
        isItalic: context.editor.isActive('italic'),
        isUnderline: context.editor.isActive('underline'),
        isCodeBlock: context.editor.isActive('codeBlock'),
        isH1: context.editor.isActive('heading', { level: 1 }),
        isH2: context.editor.isActive('heading', { level: 2 }),
        isH3: context.editor.isActive('heading', { level: 3 }),
        isParagraph: context.editor.isActive('paragraph'),
        isOrderedList: context.editor.isActive('orderedList'),
        isUnorderedList: context.editor.isActive('bulletList'),
        isImage: context.editor.isActive('image'),
        isLink: context.editor.isActive('link'),
      }
    }
  })

  const commands: Commands = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock({ language: 'js' }).run(),
    toggleH1: () => editor.chain().focus().toggleHeading({ level: 1 }).setBold().run(),
    toggleH2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleH3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    setParagraph: () => editor.chain().focus().setParagraph().run(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleUnorderedList: () => editor.chain().focus().toggleBulletList().run(),
    addImage: () => {
      const url = window.prompt('URL de la imagen');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
    addLink: () => {
      const beforeURL = editor.getAttributes('link').href;
      const url = window.prompt('URL a agregar', beforeURL)
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    },
    showHTML: () => {
      const content = editor.getHTML();
      return content;
    },
    showText: () => {
      const content = editor.getText();
      return content;
    },
  }
  if (!editor) return <Loader />
  if (editor) return (
    <>
      <Toolbar commands={commands} editorState={editorState} editor={editor} contentApi={contentApi} isGuest={isGuest} />
      <main className=''>
        <EditorContent className='editor-create min-h-screen bg-gray-ancient w-[80vw] mx-auto mt-18 rounded-lg overflow-hidden max-w-4xl' editor={editor} />
      </main>
    </>
  )
}

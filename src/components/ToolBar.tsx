import type { Editor } from '@tiptap/react';
import type { Commands, EditorState, Snippet } from '@/types/index';
import { Link } from 'react-router-dom';
import EditSnippetForm from './Snippet/EditSnippetForm';
import CreateSnippetForm from './Snippet/CreateSnippetForm';
import { useAuthContext } from '@/hooks/useAuthContext';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeBracketIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
  ListBulletIcon,
  PhotoIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

type ToolBarProps = {
  commands: Commands;
  editorState: EditorState;
  editor: Editor;
  contentApi?: Snippet;
  isGuest?: boolean;
};

export default function Toolbar({
  commands,
  editorState,
  editor,
  contentApi,
  isGuest,
}: ToolBarProps) {
  const { data: user } = useAuthContext();
  return (
    <>
      <header className="toolbar bg-slate-50 fixed w-6xl top-0 flex flex-row justify-between h-max py-2 px-4 rounded-xl z-1 shadow-lg left-1/2 -translate-x-1/2">
        <nav className="left ">
          <Link className="mr-6 group" to={`/snippet/user/${user?._id}`}>
            <span className="transform p-0 duration-500 group-hover:px-1">&lt;</span>
            <h2 className="inline text-2xl text-black font-bold  drop-shadow-sm hover:drop-shadow-lg transform duration-300 group-hover:tracking-wider">
              Zniply
            </h2>
            <span className="transform p-0 duration-500 group-hover:px-1">&gt;</span>
          </Link>

          <button onClick={commands.toggleBold} className={editorState.isBold ? 'active' : ''}>
            <BoldIcon strokeWidth={2} />
          </button>
          <button onClick={commands.toggleItalic} className={editorState.isItalic ? 'active' : ''}>
            <ItalicIcon strokeWidth={2} />
          </button>
          <button
            onClick={commands.toggleUnderline}
            className={editorState.isUnderline ? 'active' : ''}
          >
            <UnderlineIcon strokeWidth={2} />
          </button>
          <button
            onClick={commands.toggleCodeBlock}
            className={editorState.isCodeBlock ? 'active' : ''}
          >
            <CodeBracketIcon strokeWidth={2} />
          </button>
          <button onClick={commands.toggleH1} className={editorState.isH1 ? 'active' : ''}>
            <H1Icon strokeWidth={2} />
          </button>
          <button onClick={commands.toggleH2} className={editorState.isH2 ? 'active' : ''}>
            <H2Icon strokeWidth={2} />
          </button>
          <button onClick={commands.toggleH3} className={editorState.isH3 ? 'active' : ''}>
            <H3Icon strokeWidth={2} />
          </button>
          <button
            onClick={commands.setParagraph}
            className={editorState.isParagraph ? 'active' : ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6V21H10V16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4H20V6H17V21H15V6H12ZM10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14V6Z"></path>
            </svg>
          </button>
          <button
            onClick={commands.toggleOrderedList}
            className={editorState.isOrderedList ? 'active' : ''}
          >
            <NumberedListIcon strokeWidth={2} />
          </button>
          <button
            onClick={commands.toggleUnorderedList}
            className={editorState.isUnorderedList ? 'active' : ''}
          >
            <ListBulletIcon strokeWidth={2} />
          </button>
          <button onClick={commands.addImage} className={editorState.isImage ? 'active' : ''}>
            <PhotoIcon strokeWidth={2} />
          </button>
          <button onClick={commands.addLink} className={editorState.isLink ? 'active' : ''}>
            <LinkIcon strokeWidth={2} />
          </button>
        </nav>
        {contentApi?._id ? (
          <>
            <EditSnippetForm editor={editor} contentApi={contentApi} isGuest={isGuest} />
          </>
        ) : (
          <>
            <CreateSnippetForm editor={editor} isGuest={isGuest} />
          </>
        )}
      </header>
    </>
  );
}

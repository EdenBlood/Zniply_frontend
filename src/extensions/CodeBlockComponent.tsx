import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { forwardRef, useState } from 'react';

const languageMap = new Map([
  ['js', 'JavaScript'],
  ['jsx', 'JSX'],
  ['ts', 'TypeScript'],
  ['tsx', 'TSX'],
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['python', 'Python'],
  ['json', 'JSON'],
  ['bash', 'Bash'],
  ['c', 'C'],
  ['cpp', 'C++'],
  ['java', 'Java'],
  ['php', 'PHP'],
  ['go', 'Go'],
  ['ruby', 'Ruby'],
  ['rust', 'Rust'],
  ['kotlin', 'Kotlin'],
  ['sql', 'SQL'],
  ['yaml', 'YAML'],
  ['markdown', 'Markdown'],
  ['dockerfile', 'Dockerfile'],
  ['perl', 'Perl'],
  ['powershell', 'PowerShell'],
  ['swift', 'Swift'],
  ['scss', 'SCSS'],
]);

const availableLanguages = [...languageMap.keys()];

// 👇 Este es el fix clave
const CodeBlockComponent = forwardRef<HTMLDivElement, NodeViewProps>((props, ref) => {
  const { node, updateAttributes } = props;
  const [copied, setCopied] = useState(false);
  const language = node.attrs.language ?? 'text';
  const code: string = node.textContent;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper as="div" ref={ref} className="relative my-4">
      <div className="flex justify-between items-center px-3 py-2 text-sm text-white bg-[#2b2b2b] rounded-t-md">
        <select
          value={language}
          onChange={(e) => updateAttributes({ language: e.target.value })}
          className="bg-[#00292d] text-white text-xs px-2 py-1 rounded"
        >
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {languageMap.get(lang)}
            </option>
          ))}
        </select>
        <button
          onClick={copyToClipboard}
          className="bg-gray-700 px-2 py-1 text-xs rounded hover:bg-gray-600 transition"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="overflow-x-auto">
        <NodeViewContent as="code" className="hljs block px-4 py-2" />
      </pre>
    </NodeViewWrapper>
  );
});

export default CodeBlockComponent;

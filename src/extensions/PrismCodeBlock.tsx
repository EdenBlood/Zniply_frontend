import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from '@tiptap/react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import { useEffect } from 'react'

export default function PrismCodeBlock({ node, updateAttributes }: NodeViewProps) {
  const language = node.attrs.language

  useEffect(() => {
    Prism.highlightAllUnder(
      document.getElementById(node.attrs.id) || document.body
    )
  }, [language, node.textContent, node.attrs.id])

  return (
    <NodeViewWrapper as="div" className="my-4">
      <div className="flex justify-between items-center px-3 py-2 bg-gray-800 text-white rounded-t-md">
        <select
          value={language}
          onChange={e => updateAttributes({ language: e.target.value })}
          className="bg-gray-700 text-xs px-2 py-1 rounded"
        >
          {['javascript','typescript','tsx','python','bash','sql'].map(lang => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <pre data-language={language} className={`language-${language} overflow-x-auto`}>
        <NodeViewContent 
          as="code" 
          id={node.attrs.id} 
          className={`language-${language} block p-4`} 
        />
      </pre>
    </NodeViewWrapper>
  )
}

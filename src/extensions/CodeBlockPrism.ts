import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import PrismCodeBlock from '@/extensions/PrismCodeBlock'

export default Node.create({
  name: 'codeBlockPrism',
  group: 'block',
  content: 'text*',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: { default: 'javascript' },
    }
  },

  parseHTML() {
    return [{ tag: 'pre[data-language]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      { 'data-language': HTMLAttributes.language },
      ['code', HTMLAttributes, 0],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PrismCodeBlock)
  },
})

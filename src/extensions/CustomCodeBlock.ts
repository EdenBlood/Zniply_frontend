
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { createLowlight } from 'lowlight'
import CodeBlockComponent from './CodeBlockComponent'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import php from 'highlight.js/lib/languages/php'
import go from 'highlight.js/lib/languages/go'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import kotlin from 'highlight.js/lib/languages/kotlin'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import perl from 'highlight.js/lib/languages/perl'
import powershell from 'highlight.js/lib/languages/powershell'
import swift from 'highlight.js/lib/languages/swift'
import scss from 'highlight.js/lib/languages/scss'

const lowlight = createLowlight()

const languages = {
  js, javascript: js, jsx: js, ts, typescript: ts, tsx: ts, typecripstreact: ts, html, css, python, json, bash, c, cpp, java, php, go, ruby, rust,
  kotlin, sql, yaml, markdown, dockerfile, perl, powershell,
  swift, scss
}

// Registrar todos
Object.entries(languages).forEach(([name, lang]) => {
  lowlight.register(name, lang)
})

const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent)
  },
}).configure({
  lowlight,
})

export default CustomCodeBlock
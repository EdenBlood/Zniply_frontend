// // src/extensions/lowlightPrism.ts
// import { createLowlight } from 'lowlight'
// import { refractor } from 'refractor/core';
// import tsx from 'refractor/tsx'
// import jsx from 'refractor/jsx'
// import javascript from 'refractor/javascript'
// import typescript from 'refractor/typescript'
// import markup from 'refractor/markup'
// import css from 'refractor/css'
// import python from 'refractor/python'
// import sql from 'refractor/sql'
// import bash from 'refractor/bash'
// import json from 'refractor/json'
// import c from 'refractor/c'
// import cpp from 'refractor/cpp'
// import java from 'refractor/java'
// import php from 'refractor/php'
// import go from 'refractor/go'
// import ruby from 'refractor/ruby'
// import rust from 'refractor/rust'
// import kotlin from 'refractor/kotlin'
// import yaml from 'refractor/yaml'
// import markdown from 'refractor/markdown'
// import perl from 'refractor/perl'
// import powershell from 'refractor/powershell'
// import swift from 'refractor/swift'
// import scss from 'refractor/scss'


// // 1) Registramos cada gramática en refractor
// ;[
//   tsx, jsx,
//   javascript, typescript,
//   markup, css, python, sql, bash,
//   json, c, cpp, java, php, go,
//   ruby, rust, kotlin, yaml, markdown, 
//   perl, powershell, swift, scss,
// ].forEach((lang) => refractor.register(lang))

// // 2) Creamos el lowlight con Prism (vía refractor)
// const lowlight = createLowlight({ refractor })

// export default lowlight

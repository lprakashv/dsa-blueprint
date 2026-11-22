import { cp, readFile, rm, writeFile } from 'node:fs/promises'

const output = new URL('../dist/', import.meta.url)
const tagId = process.env.GOOGLE_TAG_ID?.trim() ?? ''
if (tagId && !/^(G-[A-Z0-9]+|GTM-[A-Z0-9]+)$/.test(tagId)) {
  throw new Error('GOOGLE_TAG_ID must be a GA4 ID (G-...) or Tag Manager ID (GTM-...)')
}

await rm(output, { recursive: true, force: true })
await cp(new URL('../site/', import.meta.url), output, { recursive: true })

const analyticsTag = tagId.startsWith('GTM-')
  ? `<!-- Google Tag Manager -->\n    <script async src="https://www.googletagmanager.com/gtm.js?id=${tagId}"></script>\n    <script>window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); window.googleTagManager = true;</script>`
  : tagId
    ? `<!-- Google Analytics 4 -->\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${tagId}"></script>\n    <script>window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', '${tagId}', { send_page_view: false });</script>`
    : ''
const indexPath = new URL('index.html', output)
const index = await readFile(indexPath, 'utf8')
await writeFile(indexPath, index.replace('<!-- analytics -->', analyticsTag))
console.log('Built dist/')

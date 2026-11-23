import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function buildShell({ root, site, course }) {
  const tagId = process.env.GOOGLE_TAG_ID?.trim() ?? ''
  if (tagId && !/^(G-[A-Z0-9]+|GTM-[A-Z0-9]+)$/.test(tagId)) {
    throw new Error('GOOGLE_TAG_ID must be a GA4 ID (G-...) or Tag Manager ID (GTM-...)')
  }

  await cp(join(root, 'site'), site, { recursive: true })
  await writeFile(join(site, 'src/generated/course.js'), `export default ${JSON.stringify(course)}\n`)

  const analyticsTag = tagId.startsWith('GTM-')
    ? `<!-- Google Tag Manager -->\n    <script async src="https://www.googletagmanager.com/gtm.js?id=${tagId}"></script>\n    <script>window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); window.googleTagManager = true;</script>`
    : tagId
      ? `<!-- Google Analytics 4 -->\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${tagId}"></script>\n    <script>window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', '${tagId}', { send_page_view: false });</script>`
      : ''
  const indexPath = join(site, 'index.html')
  const index = await readFile(indexPath, 'utf8')
  await writeFile(indexPath, index.replace('<!-- analytics -->', analyticsTag))
}

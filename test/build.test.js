import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { buildSite } from '@lprakashv/course-board'

test('production output uses the stock learner and ships the referenced data', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsa-blueprint-build-'))
  try {
    await Promise.all(['content', 'public'].map(dir => cp(dir, join(root, dir), { recursive: true })))
    const site = await buildSite(root, { analytics: { GOOGLE_TAG_ID: 'G-ABC123' } })
    const html = await readFile(join(site, 'index.html'), 'utf8')
    assert.match(html, /src="\.\/_board\/app\.js"/)
    assert.doesNotMatch(html, /data-course-board-adapter/)
    assert.match(html, /gtag\/js\?id=G-ABC123/)
    assert.match(html, /addEventListener\('course-board:navigate'/)
    assert.match(html, /page_title: document.title/)
    const course = JSON.parse(await readFile(join(site, 'course.json'), 'utf8'))
    assert.equal(course.id, 'dsa-blueprint')
    const { steps } = course.chapters[0].lessons[0]
    const board = await readFile(join(site, 'media', steps[0].diagram.src), 'utf8')
    assert.match(board, /array-diagram/)
    assert.match(steps.find(step => step.id === 'python').html, /class="language-python"/)
    assert.match(await readFile(join(site, 'media', course.theme), 'utf8'), /prefers-color-scheme/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

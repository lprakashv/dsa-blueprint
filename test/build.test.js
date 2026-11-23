import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { pathToFileURL } from 'node:url'
import { buildSite } from '@lprakashv/course-board'
import { buildShell } from '../scripts/course-shell.js'

test('Course Board builds the DSA shell and retains the previous build on error', async t => {
  const root = await mkdtemp(join(tmpdir(), 'dsa-course-build-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const originalTag = process.env.GOOGLE_TAG_ID
  t.after(() => {
    if (originalTag === undefined) delete process.env.GOOGLE_TAG_ID
    else process.env.GOOGLE_TAG_ID = originalTag
  })
  await cp('content', join(root, 'content'), { recursive: true })
  await cp('site', join(root, 'site'), { recursive: true })
  process.env.GOOGLE_TAG_ID = 'G-TEST123'
  const output = await buildSite(root, { shell: buildShell })
  const index = await readFile(join(output, 'index.html'), 'utf8')
  assert.match(index, /G-TEST123/)
  assert.match(index, /src\/vendor\/app\.js/)
  assert.match(index, /data-course-board-adapter="\.\.\/app\.js"/)
  assert.match(await readFile(join(output, 'src/generated/course.js'), 'utf8'), /two-pointers/)
  await writeFile(join(output, 'marker'), 'previous build')
  process.env.GOOGLE_TAG_ID = 'invalid'
  await assert.rejects(buildSite(root, { shell: buildShell }), /GOOGLE_TAG_ID/)
  assert.equal(await readFile(join(output, 'marker'), 'utf8'), 'previous build')
})

test('authored diagram data and media reach the built lesson', async t => {
  const root = await mkdtemp(join(tmpdir(), 'dsa-diagram-build-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const path of ['content', 'site', 'package.json', 'scripts/compile-course.js']) {
    await mkdir(join(root, path.split('/').slice(0, -1).join('/')), { recursive: true })
    await cp(path, join(root, path), { recursive: true })
  }
  await symlink(join(process.cwd(), 'node_modules'), join(root, 'node_modules'), 'dir')
  await mkdir(join(root, 'public/diagrams'), { recursive: true })
  await writeFile(join(root, 'public/diagrams/example.svg'), '<svg xmlns="http://www.w3.org/2000/svg"></svg>')
  const lessonPath = join(root, 'content/lessons/two-pointers.md')
  const lesson = await readFile(lessonPath, 'utf8')
  await writeFile(lessonPath, lesson.replace('## Start at both ends\n',
    '## Start at both ends\n\n```step\ndiagram: {type: svg, src: diagrams/example.svg, alt: Example}\n```\n'))
  execFileSync(process.execPath, [join(root, 'scripts/compile-course.js')], { cwd: root })
  const { lessons } = await import(pathToFileURL(join(root, 'site/src/lessons.js')))
  assert.deepEqual(lessons[0].steps[0].diagram, { type: 'svg', src: 'diagrams/example.svg', alt: 'Example' })
  const output = await buildSite(root, { shell: buildShell })
  assert.match(await readFile(join(output, 'media/diagrams/example.svg'), 'utf8'), /<svg/)
  assert.match(await readFile(join(output, 'src/generated/course.js'), 'utf8'), /diagrams\/example\.svg/)
})

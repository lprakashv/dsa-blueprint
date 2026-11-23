import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { compileCourse } from '@lprakashv/course-board'

const course = await compileCourse('.')
await mkdir('site/src/generated', { recursive: true })
await writeFile('site/src/generated/course.js', `export default ${JSON.stringify(course)}\n`)
await rm('site/media', { recursive: true, force: true })
try {
  await cp('public', 'site/media', { recursive: true })
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
await import('../site/src/lessons.js')
console.log('Compiled Course Board content')

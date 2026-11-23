import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { compileCourse } from '@lprakashv/course-board'

const course = await compileCourse('.')
const lessons = course.chapters.flatMap(chapter => chapter.lessons)
const byId = new Map(lessons.map(lesson => [lesson.id, lesson]))

// These links use Course Board fragment routes. The compiler checks attached files separately.
test('lesson and cheatsheet links point to existing steps', () => {
  for (const lesson of lessons) {
    for (const step of lesson.steps) {
      for (const [, id, target] of step.html.matchAll(/href="#\/([a-z0-9-]+)\/([a-z0-9-]+)"/g)) {
        const destination = byId.get(id)
        const exists = /^\d+$/.test(target)
          ? destination?.steps[Number(target) - 1]
          : destination?.steps.some(item => item.id === target)
        assert.ok(exists, `${lesson.id}: broken link to #/${id}/${target}`)
      }
    }
  }
})

test('study lessons use native boards, example files, and practice steps', async () => {
  assert.equal(course.extension, undefined)
  const reference = byId.get('pattern-cheatsheets')
  assert.ok(reference)
  const studyLessons = lessons.filter(lesson => lesson !== reference)
  for (const lesson of studyLessons) {
    const boards = lesson.steps.filter(step => step.diagram)
    assert.ok(boards.length, `${lesson.id}: missing walkthrough boards`)
    for (const { diagram } of boards) {
      assert.notEqual(diagram.type, 'custom', `${lesson.id}: requires a runtime renderer`)
      if (diagram.type === 'html') {
        const html = await readFile(`public/${diagram.src}`, 'utf8')
        assert.doesNotMatch(html, /<script\b/i, diagram.src)
      }
    }
    const steps = new Map(lesson.steps.map(step => [step.id, step]))
    for (const id of ['notes', 'practice', 'answer']) assert.ok(steps.has(id), `${lesson.id}: missing ${id}`)
    for (const language of ['python', 'java']) {
      const example = steps.get(language)
      assert.equal(example?.snippet?.language, language, lesson.id)
      assert.ok(example.snippet.text.trim(), lesson.id)
    }
  }
  const challenges = course.chapters.find(chapter => chapter.title === 'Misc Problems')
  assert.ok(challenges?.lessons.length)
  for (const lesson of challenges.lessons) {
    assert.ok(lesson.steps.some(step => step.id === 'hints'), lesson.id)
  }
})

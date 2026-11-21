const sections = new Set(['learn', 'practice', 'lab', 'reference'])

export function getRoute(hash, lessons) {
  const [, section, id, index] = hash.split('/')
  const page = sections.has(section) ? section : 'learn'
  const lesson = lessons.find(item => item.id === id) ?? lessons[0]
  const number = Number(index)
  const step = Number.isSafeInteger(number) && number > 0 ? Math.min(number, lesson.steps.length) - 1 : 0
  return { page, lesson, step }
}

export function lessonLink(lesson, index = 0) {
  return `#/learn/${lesson.id}/${index + 1}`
}

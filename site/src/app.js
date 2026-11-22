import { icon } from './icons.js'
import { diagram, legend, escapeText as text } from './diagrams.js'
import { lessons, modules } from './lessons.js'
import { getRoute, lessonLink } from './navigation.js'
import { trackPageView } from './analytics.js'
import { labPatterns, parseLabInput } from './trace.js'

const app = document.querySelector('#app')
const pages = [
  ['learn', 'Learn', 'book'], ['practice', 'Practice', 'target'],
  ['lab', 'Playground', 'flask'], ['reference', 'Cheatsheets', 'grid'],
]
const courseKey = 'pattern-studio-v1'

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(courseKey)) ?? {}
  } catch {
    return {}
  }
}

const saved = readProgress()
const completed = new Set(Array.isArray(saved.completed) ? saved.completed.filter(id => lessons.some(lesson => lesson.id === id)) : [])
let dark = saved.dark === true
let route = getRoute(location.hash, lessons)
const opened = new Set([modules.find(module => module.lessons.includes(route.lesson)).name])
let courseVisible = false
let practiceId = route.page === 'practice' ? route.lesson.id : lessons[0].id
let choice = null
let labId = route.page === 'lab' && Object.hasOwn(labPatterns, route.lesson.id) ? route.lesson.id : 'two-pointers'
let labInput
let labParameter
let labFrames
let labIndex = 0
let labError = ''
let timer = null
let speed = 1

function saveProgress() {
  try {
    localStorage.setItem(courseKey, JSON.stringify({ completed: [...completed], dark }))
  } catch {
    // The course still works if the browser disables local storage.
  }
}

function loadLab() {
  const pattern = labPatterns[labId]
  labInput = pattern.values.join(', ')
  labParameter = String(pattern.parameter)
  labFrames = pattern.trace(pattern.values, pattern.parameter).steps
  labIndex = 0
  labError = ''
}
loadLab()

const visualPage = () => route.page === 'learn' || route.page === 'lab'
const getFrames = () => route.page === 'learn' ? route.lesson.steps : labFrames
const getIndex = () => route.page === 'learn' ? route.step : labIndex
const currentFrame = () => getFrames()[getIndex()]
const selected = yes => yes ? ' selected' : ''
const disabled = yes => yes ? ' disabled' : ''
const current = yes => yes ? ' aria-current="page"' : ''
const room = value => text(value ?? '—')

function header() {
  return `<header class="topbar">
    <a class="brand" href="#/" aria-label="DSA Blueprint home">
      <span class="brand-icon">${icon('logo', 21)}</span>
      <span>DSA<span class="brand-accent"> Blueprint</span><small>Coding interview patterns</small></span>
    </a>
    <nav class="top-nav" aria-label="Main navigation">${pages.map(([id, label, glyph]) =>
      `<a href="#/${id}"${current(route.page === id)}>${icon(glyph, 16)}<span>${label}</span></a>`).join('')}</nav>
    <div class="top-tools">
      <button class="search-trigger" type="button" data-action="search" id="search-trigger" aria-label="Search patterns">
        ${icon('search', 16)}<span>Search patterns…</span><kbd>⌘ K</kbd>
      </button>
      <button class="icon-button" type="button" data-action="theme" id="theme-button" aria-label="${dark ? 'Use light theme' : 'Use dark theme'}">${icon(dark ? 'sun' : 'moon', 17)}</button>
      <button class="icon-button mobile-toggle" type="button" id="course-button" data-action="course" aria-expanded="${courseVisible}" aria-controls="course" aria-label="Toggle course outline">${icon('menu')}</button>
    </div>
  </header>`
}

function sidebar() {
  return `<aside class="sidebar${courseVisible ? ' is-open' : ''}" id="course">
    <div class="sidebar-head"><div><p class="eyebrow">${modules.length} MODULES</p><h2>Course outline</h2></div>
      <span class="count-badge" title="${lessons.length} patterns">${lessons.length}</span></div>
    <nav class="course-scroll" aria-label="Course outline">${modules.map(module => {
      const done = module.lessons.filter(lesson => completed.has(lesson.id)).length
      return `<details data-module="${module.name}"${opened.has(module.name) ? ' open' : ''}>
        <summary><span class="module-icon ${module.color}">${icon(module.icon, 15)}</span>
          <span class="module-name">${module.name}</span><span class="module-count">${done}/${module.lessons.length}</span>
          <span class="module-chevron">${icon('chevron', 13)}</span></summary>
        <div class="module-links">${module.lessons.map(lesson => `<a href="${lessonLink(lesson)}"${current(route.page === 'learn' && lesson === route.lesson)}>
          <span class="lesson-dot${completed.has(lesson.id) ? ' is-done' : ''}">${completed.has(lesson.id) ? icon('check', 10) : ''}</span>${lesson.title}</a>`).join('')}</div>
      </details>`
    }).join('')}</nav>
    <div class="progress-card"><div class="progress-head"><span class="progress-icon">${icon('bars', 15)}</span><strong>Your progress</strong><span>${completed.size}/${lessons.length}</span></div>
      <progress value="${completed.size}" max="${lessons.length}" aria-label="Course progress"></progress>
      <p>${completed.size} of ${lessons.length} patterns complete</p></div>
  </aside>`
}

function metrics(frame) {
  const stats = frame.stats.length ? frame.stats : [
    ['Time complexity', route.lesson.time], ['Extra space', route.lesson.space],
  ]
  return stats.map(([label, value]) => `<div class="metric"><span>${text(label)}</span><strong>${room(value)}</strong></div>`).join('')
}

function player() {
  return `<section class="player panel" aria-label="Algorithm visualization">
    <div class="player-header">
      <div class="player-title"><span class="visual-icon">${icon('array', 17)}</span><span>Visualization</span></div>
      <div class="player-tools">
        <label class="speed"><span class="sr-only">Playback speed</span><select id="speed" data-field="speed">
          ${[0.5, 1, 1.5, 2].map(value => `<option value="${value}"${selected(speed === value)}>${value}×</option>`).join('')}
        </select></label>
        <button id="reset" class="icon-button small" data-action="reset" aria-label="Reset to first step" title="Reset to first step (R)">${icon('replay', 15)}</button>
        <button id="play" class="play-button" data-action="play">${icon('play', 14)} Play</button>
      </div>
    </div>
    <div class="stage">
      <div class="metrics" id="metrics"></div>
      <div class="stage-art" id="stage-art"></div>
      <div class="legend" id="legend"></div>
    </div>
    <div id="timeline"></div>
  </section>`
}

function timeline() {
  const index = getIndex()
  const frames = getFrames()
  return `<div class="timeline">
    <div class="timeline-head"><h2 class="eyebrow">${route.page === 'learn' ? 'LESSON TIMELINE' : 'TRACE TIMELINE'}</h2><span>Step <strong>${index + 1}</strong> of ${frames.length}</span></div>
    <ol class="step-track" aria-label="Steps">
      ${frames.map((frame, i) => `<li class="${i < index ? 'past' : i === index ? 'present' : ''}">
        <button type="button" data-action="step" data-index="${i}" id="step-${i}"${i === index ? ' aria-current="step"' : ''}>
          <span class="step-number">${i + 1}</span><span class="step-name">${text(frame.label)}</span></button></li>`).join('')}
    </ol>
  </div>`
}

function guide() {
  const index = getIndex()
  const frames = getFrames()
  const frame = currentFrame()
  const inLesson = route.page === 'learn'
  const last = index === frames.length - 1
  const done = completed.has(route.lesson.id)
  const nextLesson = lessons[lessons.indexOf(route.lesson) + 1]
  const action = last && inLesson
    ? done
      ? `<a class="primary-button" href="${nextLesson ? lessonLink(nextLesson) : '#/reference'}">${nextLesson ? 'Next pattern' : 'Cheatsheets'} ${icon('right', 16)}</a>`
      : `<button id="complete" class="primary-button" data-action="complete">Complete lesson ${icon('check', 16)}</button>`
    : `<button id="next" class="primary-button" data-action="next"${disabled(last)}>Next step ${icon('right', 16)}</button>`
  return `<section class="guide-card panel">
    <div class="guide-meta"><span class="step-chip">STEP ${String(index + 1).padStart(2, '0')}</span><span>${last ? 'Summary' : index === 0 ? 'Setup' : 'Walkthrough'}</span></div>
    <div class="guide-copy">
      <h2>${text(frame.title)}</h2><p>${text(frame.body)}</p>
    </div>
    ${inLesson ? `<div class="insight"><span class="insight-icon">${icon('bulb', 18)}</span>
      <div><h3>${index === 0 ? 'PATTERN SIGNAL' : 'INVARIANT'}</h3>
      <p>${text(index === 0 ? route.lesson.signal : route.lesson.invariant)}</p></div></div>` : ''}
    <div class="guide-actions">
      <button id="previous" class="secondary-button" data-action="previous"${disabled(index === 0)}>${icon('left', 15)} Back</button>
      ${action}
    </div>
  </section>`
}

function interviewCard(lesson) {
  return `<section class="interview-card panel">
    <h2>${icon('target', 18)} Interview notes</h2>
    <div class="complexity">
      <div><span>TIME</span><strong>${text(lesson.time)}</strong></div>
      <div><span>SPACE</span><strong>${text(lesson.space)}</strong></div>
    </div>
    <p><strong>Watch for:</strong> ${text(lesson.pitfall)}</p>
    <a href="#/practice/${lesson.id}">${lesson.challenge ? 'Read the problem' : 'Try a practice question'} ${icon('right', 14)}</a>
  </section>`
}

function learn() {
  const lesson = route.lesson
  const module = modules.find(module => module.lessons.includes(lesson))
  const position = module.lessons.indexOf(lesson) + 1
  return `<div class="study">
    <div class="workbench">
      <header class="lesson-head">
        <div class="breadcrumb"><span>Learn</span>${icon('chevron', 12)}<span>${module.name}</span></div>
        <div class="lesson-title"><h1>${lesson.title}</h1>
          ${completed.has(lesson.id) ? '<span class="pill finished">Completed</span>' : ''}</div>
        <p class="lede">${lesson.summary}</p>
        <div class="lesson-meta"><span class="pill difficulty ${lesson.difficulty.toLowerCase()}"><i></i>${lesson.difficulty}</span>
          <span class="pill">${icon('clock', 13)} ${lesson.minutes} min</span>
          <span class="pill">${icon('list', 14)} ${lesson.steps.length} steps</span>
        </div>
      </header>
      ${player()}
      <details class="code-panel panel"><summary>${icon('code', 17)} Python implementation <span>Lesson ${position} of ${module.lessons.length}</span>${icon('down', 15)}</summary>
        <div class="code-wrap"><pre><code>${text(lesson.code)}</code></pre></div></details>
    </div>
    <aside class="guide-column" aria-label="Lesson guide">
      <div class="column-title"><span class="column-icon">${icon('book', 16)}</span> Lesson guide</div>
      <div id="guide"></div>
      ${interviewCard(lesson)}
      <div class="shortcuts"><span><kbd>←</kbd> <kbd>→</kbd> Step</span><span><kbd>Space</kbd> Play</span><span><kbd>R</kbd> Reset</span></div>
    </aside>
  </div>`
}

function pageHeading(name, title, description) {
  return `<header class="page-head"><div class="breadcrumb">DSA Blueprint ${icon('chevron', 12)} ${name}</div><h1>${title}</h1><p class="lede">${description}</p></header>`
}

function challengePicker(lesson) {
  return `<nav class="challenge-picker" aria-label="Hard problems">
    <h2>Hard problems</h2>
    <ul>${lessons.filter(item => item.challenge).map(item => `<li>
      <a href="#/practice/${item.id}"${current(item === lesson)}>${text(item.title)}${icon('right', 14)}</a>
    </li>`).join('')}</ul>
  </nav>`
}

function challengePrompt(lesson) {
  const challenge = lesson.challenge
  return `<div class="challenge-prompt">
    <span class="pill hard"><i></i>Hard</span>
    <h2>${text(lesson.title)}</h2>
    <p>${text(challenge.prompt)}</p>
    <h3>Example</h3>
    <pre><code>${text(`Input\n${challenge.input}\n\nOutput\n${challenge.output}`)}</code></pre>
    <p>${text(challenge.explanation)}</p>
    <h3>Constraints</h3>
    <ul>${challenge.constraints.map(item => `<li>${text(item)}</li>`).join('')}</ul>
    <div class="exercise-actions">
      <a class="primary-button" href="https://leetcode.com/problems/${encodeURIComponent(challenge.slug)}/" target="_blank" rel="noopener noreferrer">Solve on LeetCode ${icon('external', 14)}</a>
      <a class="secondary-button" href="${lessonLink(lesson)}">Open visual walkthrough ${icon('right', 15)}</a>
    </div>
  </div>`
}

function practice() {
  const lesson = lessons.find(item => item.id === practiceId)
  const question = lesson.practice
  const answered = choice !== null
  const correct = choice === question.answer
  const challenge = lesson.challenge
  const quizBody = `<${challenge ? 'h3' : 'h2'} id="question">${text(question.question)}</${challenge ? 'h3' : 'h2'}>
    <div class="choices" role="group" aria-labelledby="question">${question.options.map((option, index) =>
      `<button class="choice${answered && index === question.answer ? ' correct' : ''}${answered && index === choice && !correct ? ' incorrect' : ''}"
        data-action="answer" data-index="${index}" id="answer-${index}"${answered ? ' aria-disabled="true"' : ''}>
        <span class="choice-letter">${'ABC'[index]}</span>${text(option)}</button>`).join('')}
    </div>
    ${answered ? `<div class="answer-feedback ${correct ? 'correct' : 'incorrect'}" role="status">
      <strong>${correct ? 'Correct' : 'Review this answer'}</strong><p>${text(question.why)}</p></div>` : ''}`
  return `<div class="section-page">
    ${pageHeading('Practice', 'Practice the patterns', 'Work through an interview problem or check when to use a pattern.')}
    ${challengePicker(lesson)}
    <div class="practice-grid">
      <section class="panel exercise-card" aria-label="${challenge ? 'Problem statement' : 'Pattern question'}">
        <div class="field-label"><label for="practice-select">Pattern</label><select id="practice-select" data-field="practice">
          ${modules.map(module => `<optgroup label="${module.name}">${module.lessons.map(item =>
            `<option value="${item.id}"${selected(item.id === practiceId)}>${item.title}</option>`).join('')}</optgroup>`).join('')}
        </select></div>
        ${challenge ? `${challengePrompt(lesson)}
          <details class="challenge-reasoning"${answered ? ' open' : ''}><summary>Check your reasoning</summary>${quizBody}</details>`
          : `${quizBody}<div class="exercise-actions"><a class="secondary-button" href="${lessonLink(lesson)}">${icon('book', 16)} Review lesson</a>
            ${answered ? '<button class="primary-button" data-action="next-practice">Next question</button>' : ''}</div>`}
      </section>
      <div class="practice-aside">
      ${challenge ? `<section class="panel exercise-card challenge-hints"><h2>Hints</h2>
        ${challenge.hints.map((hint, index) => `<details><summary>Hint ${index + 1}</summary><p>${text(hint)}</p></details>`).join('')}</section>` : ''}
      <section class="panel exercise-card"><h2>${challenge ? 'Follow-up exercises' : 'Try these problems'}</h2>
        <ul class="problem-links">${question.exercises.map(([title, slug]) => `<li>${slug
          ? `<a href="https://leetcode.com/problems/${encodeURIComponent(slug)}/" target="_blank" rel="noopener noreferrer">${text(title)}${icon('external', 15)}</a>`
          : `<span>${text(title)}</span>`}</li>`).join('')}</ul>
        <p class="subtle">For each problem, explain why the pattern fits and state its time and space costs.</p>
      </section>
      </div>
    </div>
  </div>`
}

function lab() {
  const pattern = labPatterns[labId]
  return `<div class="section-page lab-page">
    ${pageHeading('Playground', 'Algorithm playground', 'Change the inputs and step through the new trace.')}
    <form id="lab-form" class="panel lab-form" novalidate>
      <div class="field-label"><label for="lab-select">Pattern</label><select id="lab-select" data-field="lab">${Object.entries(labPatterns).map(([id, item]) =>
        `<option value="${id}"${selected(id === labId)}>${item.title}</option>`).join('')}</select></div>
      <label class="field-label input-values">Array values<input id="values" name="values" value="${text(labInput)}" autocomplete="off" spellcheck="false" aria-describedby="lab-hint"></label>
      <label class="field-label input-parameter">${pattern.field}<input id="parameter" name="parameter" value="${text(labParameter)}" inputmode="numeric" autocomplete="off" aria-describedby="lab-hint"></label>
      <button class="primary-button" type="submit">${icon('play', 14)} Build trace</button>
      <p class="${labError ? 'form-error' : 'subtle'}" id="lab-hint"${labError ? ' role="alert"' : ''}>${labError ? text(labError) :
        `Use 2–10 comma-separated integers${pattern.sorted ? ' in ascending order' : ''}.`}</p>
    </form>
    <div class="lab-layout">${player()}<aside id="guide" aria-label="Trace guide"></aside></div>
  </div>`
}

function reference() {
  return `<div class="section-page reference-page">
    ${pageHeading('Cheatsheets', 'Pattern cheatsheets', 'Review when to use each pattern and what to say in an interview.')}
    ${modules.map(module => `<section class="reference-group"><h2><span class="module-icon ${module.color}">${icon(module.icon, 16)}</span>${module.name}</h2>
      <div class="reference-grid">${module.lessons.map(lesson => `<article class="panel reference-card">
        <h3><a href="${lessonLink(lesson)}">${lesson.title} ${icon('right', 15)}</a></h3>
        <p>${text(lesson.signal)}</p>
        <div class="complexity"><div><span>TIME</span><strong>${text(lesson.time)}</strong></div>
          <div><span>SPACE</span><strong>${text(lesson.space)}</strong></div></div>
        <details><summary>Python template</summary><pre><code>${text(lesson.code)}</code></pre></details>
      </article>`).join('')}</div></section>`).join('')}
  </div>`
}

function searchDialog() {
  return `<dialog id="search-dialog" aria-labelledby="search-title"><div class="search-head">
    <h2 id="search-title">Find a pattern</h2><button class="icon-button" data-action="close-search" aria-label="Close search">${icon('close')}</button></div>
    <label class="search-field">${icon('search')}<input id="search-input" autocomplete="off" type="search" placeholder="Search by topic or technique" aria-label="Search by topic or technique"></label>
    <div class="search-results" id="search-results" aria-live="polite"></div></dialog>`
}

function searchResults(query = '') {
  const normalize = value => value.toLowerCase().replace(/[-–—]/g, ' ').replaceAll('+', ' + ')
  const terms = normalize(query).trim().split(/\s+/)
  const matches = lessons.filter(lesson => {
    const subject = normalize(`${lesson.id} ${lesson.title} ${lesson.problem} ${lesson.summary} ${lesson.signal}`)
    return terms.every(term => subject.includes(term))
  })
  document.querySelector('#search-results').innerHTML = matches.length
    ? `<ul>${matches.map(lesson => `<li><a href="${lessonLink(lesson)}" data-action="search-result"><div><strong>${lesson.title}</strong>
      <span>${lesson.problem}</span></div>${icon('right', 16)}</a></li>`).join('')}</ul>`
    : '<p class="no-results">No patterns match your search.</p>'
}

function paintFrame(animate = false) {
  const frame = currentFrame()
  const art = document.querySelector('#stage-art')
  const before = Object.fromEntries([...art.querySelectorAll('[data-motion]')].map(item => [item.dataset.motion, item.getBoundingClientRect().left]))
  document.querySelector('#metrics').innerHTML = metrics(frame)
  art.innerHTML = diagram(frame.scene)
  document.querySelector('#legend').innerHTML = legend(frame.scene).map(([color, label]) =>
    `<span><i class="legend-dot ${color}"></i>${label}</span>`).join('')
  const oldScroll = document.querySelector('.step-track')?.scrollLeft ?? 0
  document.querySelector('#timeline').innerHTML = timeline()
  const track = document.querySelector('.step-track')
  const marker = track.querySelector('[aria-current="step"]').parentElement
  track.scrollLeft = oldScroll
  if (marker.offsetLeft < track.scrollLeft) {
    track.scrollLeft = marker.offsetLeft
  } else if (marker.offsetLeft + marker.offsetWidth > track.scrollLeft + track.clientWidth) {
    track.scrollLeft = marker.offsetLeft + marker.offsetWidth - track.clientWidth
  }
  if (animate) {
    document.querySelector('#announcement').textContent =
      `Step ${getIndex() + 1} of ${getFrames().length}. ${frame.title}. ${frame.body}`
  }
  document.querySelector('#guide').innerHTML = guide()
  const play = document.querySelector('#play')
  play.innerHTML = timer ? `${icon('pause', 14)} Pause` : `${icon('play', 14)} Play`
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const tag of art.querySelectorAll('[data-motion]')) {
      const x = before[tag.dataset.motion]
      if (x !== undefined) {
        tag.animate([{ transform: `translateX(${x - tag.getBoundingClientRect().left}px)` }, { transform: 'translateX(0)' }],
          { duration: 350, easing: 'cubic-bezier(.22,.75,.28,1)' })
      }
    }
    art.querySelectorAll('.is-active, .is-match').forEach(target => {
      target.animate([{ opacity: 0.55 }, { opacity: 1 }], { duration: 300, delay: Number(target.dataset.delay ?? 0), fill: 'backwards' })
    })
  }
}

function render(focusId = '') {
  const sidebarScroll = document.querySelector('.course-scroll')?.scrollTop
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.title = `${route.page === 'learn' ? route.lesson.title : pages.find(([id]) => id === route.page)[1]} · DSA Blueprint`
  const view = { learn, practice, lab, reference }[route.page]
  app.innerHTML = `<a class="skip-link" href="#content" data-action="skip">Skip to content</a>${header()}
    <div class="layout">${sidebar()}<main id="content" tabindex="-1">${view()}</main></div>${searchDialog()}
    <div class="sr-only" id="announcement" role="status"></div>`
  if (visualPage()) paintFrame()
  const outline = document.querySelector('.course-scroll')
  outline.scrollTop = sidebarScroll ?? 0
  const activeLesson = outline.querySelector('[aria-current="page"]')
  if (activeLesson && outline.clientHeight) {
    const bounds = outline.getBoundingClientRect()
    const { top, bottom } = activeLesson.getBoundingClientRect()
    if (top < bounds.top) outline.scrollTop += top - bounds.top
    else if (bottom > bounds.bottom) outline.scrollTop += bottom - bounds.bottom
  }
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true })
}

function goStep(index) {
  if (index < 0 || index >= getFrames().length) return
  const focusId = document.activeElement?.id
  if (route.page === 'learn') {
    route.step = index
    history.replaceState(null, '', lessonLink(route.lesson, index))
  } else {
    labIndex = index
  }
  paintFrame(true)
  if (!focusId) return
  const focus = document.getElementById(focusId)
  const fallback = document.getElementById('complete') ?? document.getElementById(`step-${index}`)
  const target = focus && !focus.disabled ? focus : fallback
  target?.focus({ preventScroll: true })
}

function stop() {
  clearInterval(timer)
  timer = null
  const play = document.querySelector('#play')
  if (play) play.innerHTML = `${icon('play', 14)} Play`
}

function togglePlay() {
  if (timer) {
    stop()
    return
  }
  const last = getFrames().length - 1
  if (getIndex() === last) goStep(0)
  timer = setInterval(() => {
    const next = getIndex() + 1
    if (next >= last) stop()
    goStep(next)
  }, 1650 / speed)
  document.querySelector('#play').innerHTML = `${icon('pause', 14)} Pause`
}

function selectStep(index) {
  stop()
  goStep(index)
}

function openSearch() {
  const dialog = document.querySelector('#search-dialog')
  if (dialog.open) return
  searchResults()
  dialog.showModal()
  document.querySelector('#search-input').focus()
}

function routeChanged() {
  stop()
  const previousPage = route.page
  route = getRoute(location.hash, lessons)
  const module = modules.find(item => item.lessons.includes(route.lesson))
  opened.add(module.name)
  if (route.page === 'practice') {
    practiceId = route.lesson.id
    choice = null
  }
  if (route.page === 'lab' && previousPage !== 'lab' && Object.hasOwn(labPatterns, route.lesson.id)) {
    labId = route.lesson.id
    loadLab()
  }
  courseVisible = false
  render('content')
  window.scrollTo(0, 0)
  trackPageView()
}

app.addEventListener('toggle', event => {
  const name = event.target.dataset?.module
  if (!name || !event.target.isConnected) return
  if (event.target.open) opened.add(name)
  else opened.delete(name)
}, true)

app.addEventListener('click', event => {
  const trigger = event.target.closest('[data-action]')
  if (!trigger) return
  const { action, index } = trigger.dataset
  switch (action) {
    case 'skip':
      event.preventDefault()
      document.querySelector('#content').focus()
      break
    case 'theme':
      dark = !dark
      saveProgress()
      render('theme-button')
      break
    case 'course':
      courseVisible = !courseVisible
      render('course-button')
      break
    case 'search':
      openSearch()
      break
    case 'close-search':
      document.querySelector('#search-dialog').close()
      break
    case 'search-result':
      document.querySelector('#search-dialog').close()
      break
    case 'play':
      togglePlay()
      break
    case 'reset':
      selectStep(0)
      break
    case 'next':
      selectStep(getIndex() + 1)
      break
    case 'previous':
      selectStep(getIndex() - 1)
      break
    case 'step':
      selectStep(Number(index))
      break
    case 'complete':
      completed.add(route.lesson.id)
      saveProgress()
      render()
      document.querySelector('.guide-actions a')?.focus()
      break
    case 'answer':
      if (choice === null) {
        choice = Number(index)
        render(`answer-${index}`)
      }
      break
    case 'next-practice': {
      const next = (lessons.findIndex(lesson => lesson.id === practiceId) + 1) % lessons.length
      location.hash = `#/practice/${lessons[next].id}`
      break
    }
  }
})

app.addEventListener('change', event => {
  const { field } = event.target.dataset
  if (field === 'practice') location.hash = `#/practice/${event.target.value}`
  if (field === 'lab') {
    stop()
    labId = event.target.value
    history.replaceState(null, '', `#/lab/${labId}`)
    loadLab()
    render('lab-select')
  }
  if (field === 'speed') {
    speed = Number(event.target.value)
    if (timer) {
      stop()
      togglePlay()
    }
  }
})

app.addEventListener('input', event => {
  if (event.target.id === 'search-input') searchResults(event.target.value)
  if (event.target.id === 'values') labInput = event.target.value
  if (event.target.id === 'parameter') labParameter = event.target.value
})

app.addEventListener('submit', event => {
  if (event.target.id !== 'lab-form') return
  event.preventDefault()
  stop()
  const inputs = new FormData(event.target)
  labInput = inputs.get('values')
  labParameter = inputs.get('parameter')
  const pattern = labPatterns[labId]
  try {
    labFrames = pattern.trace(...parseLabInput(pattern, labInput, labParameter)).steps
    labIndex = 0
    labError = ''
  } catch (error) {
    labError = error.message
  }
  render(labError ? 'values' : 'play')
})

document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openSearch()
    return
  }
  if (!visualPage() || document.querySelector('#search-dialog').open ||
      event.target.closest('input, select, textarea, [contenteditable]') || event.metaKey || event.ctrlKey || event.altKey) return
  if (event.key === 'ArrowRight') selectStep(getIndex() + 1)
  else if (event.key === 'ArrowLeft') selectStep(getIndex() - 1)
  else if (event.key.toLowerCase() === 'r') selectStep(0)
  else if (event.code === 'Space' && !event.target.closest('button, summary, a')) togglePlay()
  else return
  event.preventDefault()
})

window.addEventListener('hashchange', routeChanged)
render()
trackPageView()

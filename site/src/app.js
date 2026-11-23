import { icon } from './icons.js'
import { legend, escapeText as text } from './diagrams.js'
import { renderFrame } from './course-board.js'
import { lessons, miscProblems, modules } from './lessons.js'
import { getRoute, lessonLink } from './navigation.js'
import { trackPageView } from './analytics.js'
import { setupPanes } from './panes.js'
import { labPatterns, parseLabInput } from './trace.js'
import { createCourseShell } from './vendor/shell.js'
import { assetUrl } from './vendor/course-board.js'
import course from './generated/course.js'

const extension = course.extension ? await import(new URL(`../${assetUrl(course.extension)}`, import.meta.url)) : {}

const app = document.querySelector('#app')
const pages = [
  ['learn', 'Learn', 'book'], ['practice', 'Practice', 'target'],
  ['lab', 'Playground', 'flask'], ['reference', 'Cheatsheets', 'grid'],
]
const courseKey = 'pattern-studio-v1'
const shell = createCourseShell({ storageKey: courseKey, readRoute: hash => getRoute(hash, lessons) })

const saved = shell.readState({})
const paneWidths = { ...saved.paneWidths }
const completed = new Set(Array.isArray(saved.completed) ? saved.completed.filter(id => lessons.some(lesson => lesson.id === id)) : [])
let dark = saved.dark === true
let route = shell.route()
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
  shell.writeState({ completed: [...completed], dark, paneWidths })
}

const syncPanes = setupPanes(app, paneWidths, saveProgress)

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
      <span class="brand-name">DSA Blueprint</span><span class="brand-short" aria-hidden="true">DSA</span>
    </a>
    <nav class="top-nav" aria-label="Main navigation">${pages.map(([id, label, glyph]) =>
      `<a href="#/${id}"${current(route.page === id)}>${icon(glyph, 16)}<span>${label}</span></a>`).join('')}</nav>
    <div class="top-tools">
      <button class="search-trigger" type="button" data-action="search" id="search-trigger" aria-label="Search patterns">
        ${icon('search', 16)}<span>Search patterns…</span><kbd>/</kbd>
      </button>
      <button class="icon-button" type="button" data-action="theme" id="theme-button" aria-label="${dark ? 'Use light theme' : 'Use dark theme'}">${icon(dark ? 'sun' : 'moon', 17)}</button>
      <button class="icon-button mobile-toggle" type="button" id="course-button" data-action="course" aria-expanded="${courseVisible}" aria-controls="course" aria-label="Toggle course outline">${icon('menu')}</button>
    </div>
  </header>`
}

function sidebar() {
  return `<aside class="sidebar${courseVisible ? ' is-open' : ''}" id="course">
    <nav class="course-scroll" aria-label="Course outline">${modules.map(module =>
      `<details data-module="${module.name}"${opened.has(module.name) ? ' open' : ''}>
        <summary><span class="module-name">${module.name}</span></summary>
        <div class="module-links">${module.lessons.map(lesson => `<a href="${lessonLink(lesson)}"${current(route.page === 'learn' && lesson === route.lesson)}>
          <span class="lesson-dot${completed.has(lesson.id) ? ' is-done' : ''}">${completed.has(lesson.id) ? icon('check', 10) : ''}</span>${text(lesson.title)}</a>`).join('')}</div>
      </details>`).join('')}</nav>
    <div class="progress-card"><div class="progress-head"><strong>Course progress</strong><span>${completed.size}/${lessons.length}</span></div>
      <progress value="${completed.size}" max="${lessons.length}" aria-label="Course progress"></progress>
    </div>
  </aside>`
}

const divider = (key, label, controls) =>
  `<div class="pane-divider" data-resize="${key}" role="separator" aria-label="${label}" aria-controls="${controls}"
    aria-orientation="vertical" tabindex="0"></div>`

function metrics(frame) {
  const stats = frame.stats.length ? frame.stats : [
    ['Time complexity', route.lesson.time], ['Extra space', route.lesson.space],
  ]
  return stats.map(([label, value]) => `<div class="metric"><dt>${text(label)}</dt><dd>${room(value)}</dd></div>`).join('')
}

function player() {
  return `<section class="player panel" aria-labelledby="whiteboard-title">
    <div class="player-header">
      <h3 id="whiteboard-title">Whiteboard</h3>
      <div class="player-tools">
        <label class="speed"><span class="sr-only">Playback speed</span><select id="speed" data-field="speed">
          ${[0.5, 1, 1.5, 2].map(value => `<option value="${value}"${selected(speed === value)}>${value}×</option>`).join('')}
        </select></label>
        <button id="reset" class="icon-button small" data-action="reset" aria-label="Reset to first step" title="Reset to first step (R)">${icon('replay', 15)}</button>
        <button id="play" class="play-button" data-action="play">${icon('play', 14)} Play</button>
      </div>
    </div>
    <dl class="metrics" id="metrics" aria-label="Example state"></dl>
    <div class="stage">
      <div class="stage-art" id="stage-art"></div>
    </div>
    <div id="board-note"></div>
    <div class="legend" id="legend"></div>
  </section>`
}

const controlLabel = (label, glyph) =>
  `<span class="control-caption">${label}</span><span class="control-symbol" aria-hidden="true">${glyph}</span>`

function stepControls(expanded) {
  const index = getIndex()
  const frames = getFrames()
  const last = index === frames.length - 1
  let next = `<button type="button" id="next" class="primary-button" data-action="next" aria-label="Next step"${disabled(last)}>${controlLabel('Next', '→')}</button>`
  if (last && route.page === 'learn') {
    const nextLesson = lessons[lessons.indexOf(route.lesson) + 1]
    const target = nextLesson ? lessonLink(nextLesson) : '#/reference'
    const label = nextLesson ? 'Next lesson' : 'Open cheatsheets'
    next = completed.has(route.lesson.id)
      ? `<a id="next" class="primary-button" href="${target}" aria-label="${label}">${controlLabel('Next', '→')}</a>`
      : `<button type="button" id="complete" class="primary-button" data-action="complete" aria-label="Complete lesson">${controlLabel('Finish', '✓')}</button>`
  }
  return `<nav class="step-controls" aria-label="Step navigation">
    <button type="button" id="previous" class="secondary-button" data-action="previous" aria-label="Previous step"${disabled(index === 0)}>${controlLabel('Back', '←')}</button>
    <details class="step-menu"${expanded ? ' open' : ''}>
      <summary id="step-menu" class="secondary-button" aria-label="Steps, step ${index + 1} of ${frames.length}">
        ${controlLabel(`Step ${index + 1} of ${frames.length}`, `${index + 1}/${frames.length}`)}
      </summary>
      <ol class="step-list" aria-label="Steps">${frames.map((frame, i) =>
        `<li><button type="button" data-action="step" data-index="${i}" id="step-${i}"${i === index ? ' aria-current="step"' : ''}>
          <span>${i + 1}</span>${text(frame.title)}</button></li>`).join('')}
      </ol>
    </details>
    ${next}
  </nav>`
}

function guide() {
  const frame = currentFrame()
  const first = getIndex() === 0
  return `<div class="guide-card panel">
    ${frame.html ?? `<p>${text(frame.body)}</p>`}
    ${route.page === 'learn' ? `<div class="insight">
      <h3>${first ? 'Pattern signal' : 'Invariant'}</h3>
      <p>${text(first ? route.lesson.signal : route.lesson.invariant)}</p>
    </div>` : ''}
  </div>`
}

function interviewCard(lesson) {
  return `<section class="interview-card panel">
    <h3>${icon('target', 18)} Interview notes</h3>
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
    <header class="lesson-title-row">
      <div class="lesson-title"><h1>${text(lesson.title)}</h1>
        ${completed.has(lesson.id) ? '<span class="pill finished">Completed</span>' : ''}</div>
      <div id="step-controls"></div>
    </header>
    <div class="lesson-head">
      <p class="lesson-meta"><span>${module.name} · Lesson ${position} of ${module.lessons.length}</span>
        <span>${lesson.difficulty} · ${lesson.minutes} min</span></p>
      <p class="lede">${text(lesson.summary)}</p>
    </div>
    <h2 id="step-title" class="stage-heading"></h2>
    <div class="lesson-workspace">
      ${player()}
      ${divider('reading', 'Lesson text width', 'lesson-reading')}
      <aside class="guide-column" id="lesson-reading" aria-labelledby="step-title">
        <div id="guide"></div>
        ${interviewCard(lesson)}
        <div class="shortcuts"><span><kbd>←</kbd> <kbd>→</kbd> Step</span><span><kbd>Space</kbd> Play</span><span><kbd>R</kbd> Reset</span></div>
      </aside>
    </div>
    <details class="code-panel panel"><summary>${icon('code', 17)} Python implementation ${icon('down', 15)}</summary>
      <div class="code-wrap"><pre><code>${text(lesson.code)}</code></pre></div>
    </details>
    <details class="code-panel panel"><summary>${icon('code', 17)} Java implementation ${icon('down', 15)}</summary>
      <div class="code-wrap"><pre><code>${text(lesson.java)}</code></pre></div>
    </details>
  </div>`
}

function pageHeading(title, description) {
  return `<header class="page-head"><h1>${title}</h1><p class="lede">${description}</p></header>`
}

function challengePicker(lesson) {
  return `<nav class="challenge-picker" aria-labelledby="misc-problems-heading">
    <h2 id="misc-problems-heading">${miscProblems.name}</h2>
    <ul>${miscProblems.lessons.map(item => `<li>
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
    ${pageHeading('Practice the patterns', 'Work through an interview problem or check when to use a pattern.')}
    ${challengePicker(lesson)}
    <div class="practice-grid">
      <section class="panel exercise-card" aria-label="${challenge ? 'Problem statement' : 'Pattern question'}">
        <div class="field-label"><label for="practice-select">Pattern</label><select id="practice-select" data-field="practice">
          ${modules.map(module => `<optgroup label="${module.name}">${module.lessons.map(item =>
            `<option value="${item.id}"${selected(item.id === practiceId)}>${text(item.title)}</option>`).join('')}</optgroup>`).join('')}
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
    ${pageHeading('Algorithm playground', 'Change the inputs and step through the new trace.')}
    <form id="lab-form" class="panel lab-form" novalidate>
      <div class="field-label"><label for="lab-select">Pattern</label><select id="lab-select" data-field="lab">${Object.entries(labPatterns).map(([id, item]) =>
        `<option value="${id}"${selected(id === labId)}>${item.title}</option>`).join('')}</select></div>
      <label class="field-label input-values">Array values<input id="values" name="values" value="${text(labInput)}" autocomplete="off" spellcheck="false" aria-describedby="lab-hint"></label>
      <label class="field-label input-parameter">${pattern.field}<input id="parameter" name="parameter" value="${text(labParameter)}" inputmode="numeric" autocomplete="off" aria-describedby="lab-hint"></label>
      <button class="primary-button" type="submit">${icon('play', 14)} Build trace</button>
      <p class="${labError ? 'form-error' : 'subtle'}" id="lab-hint"${labError ? ' role="alert"' : ''}>${labError ? text(labError) :
        `Use 2–10 comma-separated integers${pattern.sorted ? ' in ascending order' : ''}.`}</p>
    </form>
    <div class="trace-title"><h2 id="step-title" class="stage-heading"></h2><div id="step-controls"></div></div>
    <div class="lesson-workspace">${player()}
      ${divider('reading', 'Trace text width', 'lesson-reading')}
      <aside class="guide-column" id="lesson-reading" aria-labelledby="step-title"><div id="guide"></div></aside>
    </div>
  </div>`
}

function reference() {
  return `<div class="section-page reference-page">
    ${pageHeading('Pattern cheatsheets', 'Review when to use each pattern and what to say in an interview.')}
    ${modules.map(module => `<section class="reference-group"><h2><span class="module-icon ${module.color}">${icon(module.icon, 16)}</span>${module.name}</h2>
      <div class="reference-grid">${module.lessons.map(lesson => `<article class="panel reference-card">
        <h3><a href="${lessonLink(lesson)}">${text(lesson.title)} ${icon('right', 15)}</a></h3>
        <p>${text(lesson.signal)}</p>
        <div class="complexity"><div><span>TIME</span><strong>${text(lesson.time)}</strong></div>
          <div><span>SPACE</span><strong>${text(lesson.space)}</strong></div></div>
        <details><summary>Python template</summary><pre><code>${text(lesson.code)}</code></pre></details>
        <details><summary>Java template</summary><pre><code>${text(lesson.java)}</code></pre></details>
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
    ? `<ul>${matches.map(lesson => `<li><a href="${lessonLink(lesson)}" data-action="search-result"><div><strong>${text(lesson.title)}</strong>
      <span>${lesson.problem}</span></div>${icon('right', 16)}</a></li>`).join('')}</ul>`
    : '<p class="no-results">No patterns match your search.</p>'
}

function paintFrame(animate = false) {
  const frame = currentFrame()
  const art = document.querySelector('#stage-art')
  const before = Object.fromEntries([...art.querySelectorAll('[data-motion]')].map(item => [item.dataset.motion, item.getBoundingClientRect().left]))
  document.querySelector('#metrics').innerHTML = frame.diagram ? '' : metrics(frame)
  try {
    art.innerHTML = renderFrame(frame, extension.diagrams)
  } catch (error) {
    art.innerHTML = `<p role="alert">${text(error.message)}</p>`
  }
  const note = art.querySelector('.scene-note')
  const boardNote = document.querySelector('#board-note')
  boardNote.replaceChildren(...(note ? [note] : []))
  if (frame.diagram?.caption) {
    const caption = document.createElement('p')
    caption.className = 'scene-note'
    caption.textContent = frame.diagram.caption
    boardNote.append(caption)
  }
  if (frame.diagram?.source) {
    const download = document.createElement('a')
    download.href = assetUrl(frame.diagram.source)
    download.download = ''
    download.textContent = 'Download scene'
    boardNote.append(download)
  }
  document.querySelector('#legend').innerHTML = (frame.diagram ? [] : legend(frame.scene)).map(([color, label]) =>
    `<span><i class="legend-dot ${color}"></i>${label}</span>`).join('')
  const menu = document.querySelector('.step-menu')
  const scroll = menu?.querySelector('.step-list').scrollTop ?? 0
  document.querySelector('#step-controls').innerHTML = stepControls(menu?.open)
  document.querySelector('.step-list').scrollTop = scroll
  document.querySelector('#step-title').textContent = frame.title
  if (animate) {
    const prose = document.createElement('div')
    if (frame.html) prose.innerHTML = frame.html
    document.querySelector('#announcement').textContent =
      `Step ${getIndex() + 1} of ${getFrames().length}. ${frame.title}. ${frame.html ? prose.textContent.trim() : frame.body}`
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
    <div class="layout">${sidebar()}${divider('nav', 'Course navigation width', 'course')}<main id="content" tabindex="-1">${view()}</main></div>${searchDialog()}
    <div class="sr-only" id="announcement" role="status"></div>`
  if (visualPage()) paintFrame()
  syncPanes()
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
  const fallback = document.getElementById('complete') ?? document.getElementById('step-menu')
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
  const menu = document.querySelector('.step-menu[open]')
  if (menu) menu.open = false
  searchResults()
  dialog.showModal()
  document.querySelector('#search-input').focus()
}

function routeChanged() {
  stop()
  const previous = route
  route = shell.route()
  const module = modules.find(item => item.lessons.includes(route.lesson))
  if (!module.lessons.includes(previous.lesson)) opened.clear()
  opened.add(module.name)
  if (route.page === 'practice') {
    practiceId = route.lesson.id
    choice = null
  }
  if (route.page === 'lab' && previous.page !== 'lab' && Object.hasOwn(labPatterns, route.lesson.id)) {
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
  const menu = document.querySelector('.step-menu[open]')
  if (menu && !menu.contains(event.target)) menu.open = false
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
      trigger.closest('.step-menu').open = false
      document.querySelector('#step-menu').focus({ preventScroll: true })
      selectStep(Number(index))
      break
    case 'complete':
      completed.add(route.lesson.id)
      saveProgress()
      render('next')
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
  if (event.defaultPrevented) return
  const menu = document.querySelector('.step-menu[open]')
  if (event.key === 'Escape' && menu) {
    event.preventDefault()
    menu.open = false
    menu.querySelector('summary').focus()
    return
  }
  const editing = event.target.closest('input, select, textarea, [contenteditable]')
  if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !editing && !event.altKey && !event.metaKey && !event.ctrlKey)) {
    event.preventDefault()
    openSearch()
    return
  }
  if (!visualPage() || document.querySelector('#search-dialog').open ||
      editing || event.metaKey || event.ctrlKey || event.altKey) return
  if (event.key === 'ArrowRight') selectStep(getIndex() + 1)
  else if (event.key === 'ArrowLeft') selectStep(getIndex() - 1)
  else if (event.key.toLowerCase() === 'r') selectStep(0)
  else if (event.code === 'Space' && !event.target.closest('button, summary, a')) togglePlay()
  else return
  event.preventDefault()
})

shell.start({
  render: () => { render(); trackPageView() },
  onNavigate: routeChanged,
})

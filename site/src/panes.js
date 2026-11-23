const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(value, maximum))

export function fitPanes(available, preferred, minimums) {
  const nav = clamp(preferred.nav, minimums.nav, available - minimums.reading - minimums.board)
  const reading = clamp(preferred.reading, minimums.reading, available - nav - minimums.board)
  return { nav, reading }
}

export function setupPanes(app, preferred, save) {
  let limits
  let widths
  let drag

  function sync() {
    const layout = app.querySelector('.layout')
    const nav = layout.querySelector('[data-resize="nav"]')
    if (!nav.getClientRects().length) return
    const reading = layout.querySelector('[data-resize="reading"]')
    const style = getComputedStyle(layout)
    const pixels = property => Number.parseFloat(style.getPropertyValue(property))
    const minimums = { nav: pixels('--nav-min'), reading: reading ? pixels('--reading-min') : 0, board: pixels('--board-min') }
    const available = Math.floor(layout.clientWidth - pixels('padding-left') - pixels('padding-right') - (reading ? 2 : 1) * pixels('--divider'))
    widths = fitPanes(available, {
      nav: Number.isFinite(preferred.nav) ? preferred.nav : pixels('--nav-default'),
      reading: reading ? (Number.isFinite(preferred.reading) ? preferred.reading : pixels('--reading-default')) : 0,
    }, minimums)
    limits = {
      nav: [minimums.nav, available - widths.reading - minimums.board],
      reading: [minimums.reading, available - widths.nav - minimums.board],
    }
    for (const handle of [nav, reading].filter(Boolean)) {
      const key = handle.dataset.resize
      layout.style.setProperty(`--${key}-width`, `${widths[key]}px`)
      handle.setAttribute('aria-valuemin', limits[key][0])
      handle.setAttribute('aria-valuemax', limits[key][1])
      handle.setAttribute('aria-valuenow', widths[key])
      handle.setAttribute('aria-valuetext', `${widths[key]} pixels`)
    }
  }

  function change(key, width) {
    preferred[key] = clamp(Math.round(width), ...limits[key])
    sync()
  }

  app.addEventListener('pointerdown', event => {
    const handle = event.target.closest('[data-resize]')
    if (!handle || event.button !== 0 || drag) return
    const key = handle.dataset.resize
    drag = { id: event.pointerId, key, start: event.clientX, width: widths[key] }
    handle.setPointerCapture(event.pointerId)
    handle.focus({ preventScroll: true })
    handle.closest('.layout').classList.add('resizing')
    event.preventDefault()
  })
  app.addEventListener('pointermove', event => {
    if (drag?.id === event.pointerId) change(drag.key, drag.width + event.clientX - drag.start)
  })
  function stopDrag(event) {
    if (drag?.id !== event.pointerId) return
    drag = undefined
    app.querySelector('.layout').classList.remove('resizing')
    save()
  }
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    app.addEventListener(type, stopDrag)
  }

  app.addEventListener('keydown', event => {
    const key = event.target.dataset.resize
    if (!key) return
    const step = event.shiftKey ? 32 : 12
    const [min, max] = limits[key]
    const sizes = { ArrowLeft: widths[key] - step, ArrowRight: widths[key] + step, Home: min, End: max }
    if (!Object.hasOwn(sizes, event.key)) return
    event.preventDefault()
    change(key, sizes[event.key])
    save()
  })
  window.addEventListener('resize', sync)
  return sync
}

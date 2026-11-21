// Escape display text because the lab accepts text input.
export const escapeText = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char])

const active = (yes, name) => yes ? ` ${name}` : ''
const note = text => text ? `<p class="scene-note">${escapeText(text)}</p>` : ''

function arrayScene({ values, markers = {}, range, matched = [], band, equation }) {
  const [left, right] = range ?? [0, values.length - 1]
  const cells = values.map((value, index) => {
    const marker = markers[index]
    const match = matched.includes(index)
    return `<div class="array-slot">
      <span class="array-index">${index}</span>
      <span class="array-cell${active(marker || (band && left <= index && index <= right), 'is-active')}${active(marker === 'R' || marker === 'HI', 'is-right')}${active(index < left || index > right, 'is-muted')}${active(match, 'is-match')}">${escapeText(value)}</span>
      <div class="marker">${marker ? `<span data-motion="${escapeText(marker)}" class="marker-tag${active(marker === 'R' || marker === 'HI', 'is-right')}">${escapeText(marker)}</span>` : ''}</div>
    </div>`
  }).join('')
  return `<div class="array-diagram" style="--count:${values.length}">
    <div class="array-label"><span>INDEX</span><span>VALUE</span></div>
    <div class="array-cells">${cells}${band ? `<i class="window-bracket${active(matched.length, 'is-match')}" data-motion="window"
      style="--window-start:${left};--window-width:${right - left + 1}" aria-hidden="true"></i>` : ''}</div>
    ${note(equation)}
  </div>`
}

function laneScene({ rows, caption }) {
  return `<div class="lane-diagram">${rows.map(([label, values, marked = []]) => `
    <div class="lane"><span class="lane-label">${escapeText(label)}</span><div class="lane-cells">${values.length ?
      values.map((value, index) => `<span class="array-cell${active(marked.includes(index), 'is-active')}">${escapeText(value)}</span>`).join('') :
      '<span class="empty-cell">empty</span>'}</div></div>`).join('')}
    ${note(caption)}
  </div>`
}

function intervalScene({ groups, end, caption }) {
  const ticks = Array.from({ length: end }, (_, index) => `<span>${index + 1}</span>`).join('')
  return `<div class="interval-diagram">
    <div class="interval-axis">${ticks}</div>
    ${groups.map(([label, ranges, marked = []]) => `<div class="interval-group"><span class="lane-label">${escapeText(label)}</span>
      <div class="interval-tracks">${ranges.length ? ranges.map(([start, finish], index) => `<div class="interval-track">
        <span class="interval-bar${active(marked.includes(index), 'is-active')}" style="--start:${(start - 1) / (end - 1) * 100}%;--length:${(finish - start) / (end - 1) * 100}%">${start}–${finish}</span>
      </div>`).join('') : '<span class="empty-cell">empty</span>'}</div></div>`).join('')}
    ${note(caption)}
  </div>`
}

function graphEdge([a, b, weight], points, { directed, highlighted, linked }) {
  const from = points[a]
  const to = points[b]
  const dx = to.x - from.x
  const dy = to.y - from.y
  const toBorder = point => Math.min((point.width / 2 + 3) / Math.abs(dx), 23 / Math.abs(dy))
  const start = directed ? toBorder(from) : 0
  const end = directed ? toBorder(to) : 0
  const labelX = (from.x + to.x) / 2 + (dx === 0 ? 14 : 0)
  const labelY = (from.y + to.y) / 2 - (dx === 0 ? 0 : 8)
  return `<g class="graph-edge${active(linked, 'is-link')}${active(highlighted, 'is-active')}">
    <line x1="${from.x + start * dx}" y1="${from.y + start * dy}" x2="${to.x - end * dx}" y2="${to.y - end * dy}"
      ${directed ? 'marker-end="url(#graph-arrow)"' : ''}/>
    ${weight === undefined ? '' : `<g class="edge-weight" transform="translate(${labelX} ${labelY})">
      <rect x="-11" y="-9" width="22" height="18" rx="6"/><text text-anchor="middle" dy=".33em">${escapeText(weight)}</text></g>`}
  </g>`
}

function graphScene({ nodes, edges, visited, active: current, caption, kind = '', directed = false,
  activeEdges = [], links = [], labels = {}, values = {} }) {
  const points = Object.fromEntries(nodes.map(([id, x, y]) => {
    const label = labels[id] ?? id
    return [id, { x: x * 4.2, y: y * 2.4, width: Math.max(44, label.length * 7.5 + 18), label }]
  }))
  const highlighted = ([a, b]) => activeEdges.some(([from, to]) => from === a && to === b)
  const connection = ([a, b, weight]) => `${points[a].label} to ${points[b].label}${weight === undefined ? '' : `, weight ${weight}`}`
  const description = [
    ...nodes.map(([id]) => values[id] === undefined ? points[id].label : `${points[id].label}, distance ${values[id]}`),
    ...edges.map(connection),
    ...links.map(edge => `Leaf link: ${connection(edge)}`),
  ].join('. ')
  return `<div class="graph-diagram ${kind}"><svg viewBox="0 0 420 240" role="img" aria-label="${escapeText(caption)}" aria-describedby="graph-description">
    <desc id="graph-description">${escapeText(description)}.</desc>
    ${directed || links.length ? `<defs><marker id="graph-arrow" viewBox="0 0 8 8" refX="7" refY="4"
      markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 8 4 0 8Z"/></marker></defs>` : ''}
    ${edges.map(edge => graphEdge(edge, points, { directed, highlighted: highlighted(edge) })).join('')}
    ${links.map(edge => graphEdge(edge, points, { directed: true, linked: true, highlighted: highlighted(edge) })).join('')}
    ${nodes.map(([node]) => {
      const { x, y, width, label } = points[node]
      const value = values[node]
      return `<g class="graph-node${active(visited.includes(node), 'is-visited')}${active(node === current, 'is-active')}" transform="translate(${x} ${y})">
        <title>${escapeText(label)}${value === undefined ? '' : `, distance ${escapeText(value)}`}${node === current ? ', current' : ''}</title>
        <rect x="${-width / 2}" y="-20" width="${width}" height="40" rx="10"/>
        <text class="graph-label" y="${value === undefined ? 5 : -3}" text-anchor="middle">${escapeText(label)}</text>
        ${value === undefined ? '' : `<text class="graph-value" y="13" text-anchor="middle">${escapeText(value)}</text>`}
      </g>`
    }).join('')}
  </svg>${note(caption)}</div>`
}

function matrixScene({ values, caption, rows = values.map((_, index) => index),
  columns = values[0].map((_, index) => index), current = [], done = [], blocked = [], legend = [] }) {
  const order = new Map(current.map((cell, index) => [cell.join(','), index]))
  const marked = new Set(done.map(cell => cell.join(',')))
  const walls = new Set(blocked.map(cell => cell.join(',')))
  return `<div class="matrix-diagram"><table aria-label="${escapeText(caption)}">
    <thead><tr><td></td>${columns.map(column => `<th scope="col">${escapeText(column)}</th>`).join('')}</tr></thead>
    <tbody>${values.map((row, r) => `<tr><th scope="row">${escapeText(rows[r])}</th>${row.map((value, c) => {
      const cell = `${r},${c}`
      const index = order.get(cell)
      const state = index !== undefined ? 'is-active' : marked.has(cell) ? 'is-match' : walls.has(cell) ? 'matrix-blocked' : ''
      const status = index !== undefined ? legend[0] ?? 'Current cell'
        : marked.has(cell) ? legend[1] ?? 'Processed cell' : walls.has(cell) ? legend[2] ?? 'Blocked' : ''
      return `<td><span class="array-cell ${state}"${index === undefined ? '' : ` data-delay="${index * 60}"`}>
        ${escapeText(value)}${status ? `<span class="sr-only">, ${escapeText(status)}</span>` : ''}</span></td>`
    }).join('')}</tr>`).join('')}</tbody>
  </table>${note(caption)}</div>`
}

function stackScene({ input, values, focus }) {
  return `<div class="stack-diagram">
    <div class="stack-input"><span class="lane-label">INPUT</span><div class="lane-cells">${input.map((value, index) =>
      `<span class="array-cell${active(index === focus, 'is-active')}">${escapeText(value)}</span>`).join('')}</div></div>
    <div class="stack-output"><span class="lane-label">STACK</span><div class="stack-box">
      ${values.length ? values.map((value, index) => `<span class="array-cell${active(index === values.length - 1, 'is-active')}">${escapeText(value)}</span>`).join('') : '<span class="empty-cell">empty</span>'}
    </div></div>
  </div>`
}

function linkedScene({ values, links, active: current, caption }) {
  return `<div class="linked-diagram">
    <div class="link-row">${values.map((value, index) => `<div class="link-item"><span class="array-cell${active(index === current, 'is-active')}">${value}</span>
      <span class="link-target">↳ ${values[links[index]] ?? 'null'}</span></div>`).join('')}</div>
    ${note(caption)}
  </div>`
}

function histogramScene({ values, stack, focus, rectangle, caption }) {
  const peak = Math.max(...values, 1)
  const description = `Bar heights: ${values.join(', ')}. Stack indices: ${stack.join(', ') || 'empty'}. ${caption}`
  return `<div class="histogram-diagram" style="--bar-count:${values.length}">
    <div class="histogram-plot" role="img" aria-label="${escapeText(description)}">
      ${values.map((height, index) => `<div class="histogram-bar${active(stack.includes(index), 'is-stacked')}${active(index === focus, 'is-active')}"
        style="--bar-height:${height / peak * 100}%"><span>${height}</span></div>`).join('')}
      ${rectangle ? `<div class="histogram-rectangle is-match" style="--left-bar:${rectangle[0] + 1};--after-bar:${rectangle[1] + 2};--bar-height:${rectangle[2] / peak * 100}%"></div>` : ''}
    </div>
    <div class="histogram-indices" aria-hidden="true">${values.map((_, index) => `<span>${index}</span>`).join('')}</div>
    ${note(caption)}
  </div>`
}

const renderers = { array: arrayScene, lanes: laneScene, graph: graphScene, stack: stackScene, linked: linkedScene, intervals: intervalScene, matrix: matrixScene, histogram: histogramScene }

export function diagram(scene) {
  return renderers[scene.type](scene)
}

export function legend(scene) {
  if (scene.type === 'array' && Object.values(scene.markers ?? {}).includes('L')) {
    return [['purple', 'Left pointer'], ['teal', 'Right pointer'], ['gray', 'Array element']]
  }
  if (scene.kind === 'heap') return [['purple', 'Heap minimum'], ['gray', 'Other retained value']]
  if (scene.kind === 'forest') return [['purple', 'Find path'], ['teal', 'Root'], ['gray', 'Parent link']]
  if (scene.kind === 'pages') return [['purple', 'Current page'], ['teal', 'Matched or read page'], ['gray', scene.links?.length ? 'Page and leaf links' : 'Child link']]
  if (scene.kind === 'weighted') return [['purple', 'Current edge or node'], ['teal', 'Finished node'], ['gray', 'Other edge or node']]
  if (scene.type === 'matrix') {
    const [current = 'Current cells', done = 'Processed cells', blocked] = scene.legend ?? []
    return [['purple', current], ['teal', done], ['gray', blocked ?? 'Other cells']]
  }
  if (scene.type === 'intervals') return [['purple', 'Selected range'], ['gray', 'Other range']]
  if (scene.type === 'histogram') return [['purple', 'Current or stacked bar'], ['teal', 'Candidate rectangle'], ['gray', 'Other bar']]
  if (scene.type === 'graph') return [['purple', 'Current node'], ['teal', 'Visited'], ['gray', 'Unvisited']]
  if (scene.type === 'array' && scene.band) return [['purple', 'Current window'], ['teal', 'Best window']]
  return [['purple', 'Current value'], ['gray', 'Other value']]
}

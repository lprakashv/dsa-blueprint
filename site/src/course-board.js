import { diagram } from './diagrams.js'
import { renderDiagram } from './vendor/course-board.js'

export function renderFrame(frame, renderers = {}) {
  return renderDiagram(
    frame.diagram ?? { type: 'custom', name: 'dsa-scene', alt: frame.title, data: frame.scene },
    { renderers: { ...renderers, 'dsa-scene': ({ data }) => diagram(data) } },
  )
}

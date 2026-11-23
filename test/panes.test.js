import assert from 'node:assert/strict'
import test from 'node:test'
import { fitPanes } from '../site/src/panes.js'

const minimums = { nav: 144, reading: 224, board: 480 }

test('preserves preferred pane widths when the board has room', () => {
  const preferred = { nav: 220, reading: 310 }
  assert.deepEqual(fitPanes(1100, preferred, minimums), preferred)
})

test('fits the panes without reducing the board below its minimum', () => {
  const preferred = { nav: 300, reading: 360 }
  assert.deepEqual(fitPanes(1000, preferred, minimums), { nav: 296, reading: 224 })
  assert.deepEqual(fitPanes(1000, { nav: 152, reading: 500 }, minimums), { nav: 152, reading: 368 })
  assert.deepEqual(preferred, { nav: 300, reading: 360 })
})

test('allows a wide navigation pane on views without a reading pane', () => {
  const preferred = { nav: 600, reading: 0 }
  assert.deepEqual(fitPanes(1000, preferred, { ...minimums, reading: 0 }), { nav: 520, reading: 0 })
})

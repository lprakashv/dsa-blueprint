import assert from 'node:assert/strict'
import test from 'node:test'
import { binarySearch, labPatterns, parseLabInput, slidingWindow, twoPointers } from '../site/src/trace.js'

test('two pointers return distinct indices, including with equal values', () => {
  const values = [-4, -1, 0, 4, 4, 7]
  for (let target = -10; target <= 16; target += 1) {
    const exists = values.some((value, i) => values.slice(i + 1).some(other => value + other === target))
    const { result, steps, comparisons } = twoPointers(values, target)
    assert.equal(Boolean(result), exists)
    assert.ok(comparisons <= values.length - 1)
    if (result) {
      const [left, right] = result
      assert.ok(left < right)
      assert.equal(values[left] + values[right], target)
    } else {
      assert.equal(steps.at(-1).scene.equation, 'No pair')
    }
  }
})

test('sliding window matches direct summation for all widths of a mixed array', () => {
  const values = [-8, 4, -2, 0, 5, -6]
  for (let width = 1; width <= values.length; width += 1) {
    const sums = Array.from({ length: values.length - width + 1 }, (_, start) =>
      values.slice(start, start + width).reduce((total, value) => total + value, 0))
    const best = Math.max(...sums)
    const { result, bestStart, steps } = slidingWindow(values, width)
    assert.equal(result, best)
    assert.equal(bestStart, sums.indexOf(best))
    assert.equal(steps.at(-1).scene.matched.length, width)
  }
  assert.equal(slidingWindow([-5, -2, -3], 2).result, -5)
})

test('binary search handles both halves, duplicate values, and absent targets', () => {
  const values = [-8, -2, -2, 0, 5, 10]
  for (let target = -10; target <= 12; target += 1) {
    const { result, steps } = binarySearch(values, target)
    assert.ok(steps.length <= 4)
    assert.equal(result !== -1, values.includes(target))
    if (result !== -1) assert.equal(values[result], target)
  }
  assert.equal(binarySearch([1, 4], 4).result, 1)
})

test('lab parsing enforces integer, length, ordering and width bounds', () => {
  assert.deepEqual(parseLabInput(labPatterns['two-pointers'], ' -4, 4, 4 ', ' 0 '), [[-4, 4, 4], 0])
  assert.deepEqual(parseLabInput(labPatterns['sliding-window'], '7, 1', '2'), [[7, 1], 2])

  for (const input of ['2,', '2', '1, 1.5', '1, 0x2', '0, 1000', '2, -1000', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10']) {
    assert.throws(() => parseLabInput(labPatterns['two-pointers'], input, '0'), /2 to 10 comma-separated integers/)
  }
  assert.throws(() => parseLabInput(labPatterns['binary-search'], '5, 2', '5'), /ascending order/)
  assert.throws(() => parseLabInput(labPatterns['binary-search'], '2, 5', ' '), /integer/)
  assert.throws(() => parseLabInput(labPatterns['binary-search'], '2, 5', '3.5'), /integer/)
  assert.throws(() => parseLabInput(labPatterns['sliding-window'], '2, 5', '0'), /window size/)
  assert.throws(() => parseLabInput(labPatterns['sliding-window'], '2, 5', '3'), /window size/)
})

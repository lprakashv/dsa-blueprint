const array = (values, markers = {}, options = {}) => ({ type: 'array', values, markers, ...options })

function frame(label, title, body, scene, stats) {
  return { label, title, body, scene, stats }
}

export function twoPointers(values, target) {
  let left = 0
  let right = values.length - 1
  const steps = [frame('Set pointers', 'Start at both ends',
    'Put Left at the first element and Right at the last. The array is sorted, so you can rule out one end after each comparison.',
    array(values, { [left]: 'L', [right]: 'R' }, { range: [left, right] }),
    [['Target sum', target], ['Left index', left], ['Right index', right]])]

  let comparisons = 0
  while (left < right) {
    const sum = values[left] + values[right]
    const found = sum === target
    comparisons += 1
    const moveRight = sum > target
    const label = comparisons === 1 ? 'Compare' : found ? 'Match' : moveRight ? 'Too high' : 'Too low'
    steps.push(frame(label, found ? 'The pair adds up' : moveRight ? 'The sum is too high' : 'The sum is too low',
      found ? `${values[left]} + ${values[right]} = ${target}. Return the two indices, ${left} and ${right}.`
        : moveRight ? `${sum} > ${target}. Every other left value is at least ${values[left]}, so index ${right} cannot be in the answer. Move Right left.`
          : `${sum} < ${target}. Every other right value is at most ${values[right]}, so index ${left} cannot be in the answer. Move Left right.`,
      array(values, { [left]: 'L', [right]: 'R' }, {
        range: [left, right], matched: found ? [left, right] : [],
        equation: `${values[left]} + ${values[right]} = ${sum}`,
      }),
      [['Target sum', target], ['Left index', left], ['Right index', right]]))
    if (found) return { steps, result: [left, right], comparisons }
    if (moveRight) right -= 1
    else left += 1
  }

  steps.push(frame('Stop', 'The pointers meet', 'There are no distinct positions left to check. Return no pair.',
    array(values, { [left]: 'L = R' }, { range: [left, right], equation: 'No pair' }),
    [['Target sum', target], ['Comparisons', comparisons], ['Pair', 'None']]))
  return { steps, result: null, comparisons }
}

export function slidingWindow(values, width) {
  const steps = []
  let sum = values.slice(0, width).reduce((total, value) => total + value, 0)
  let best = sum
  let bestStart = 0
  for (let left = 0; left + width <= values.length; left += 1) {
    const right = left + width - 1
    if (left > 0) sum += values[right] - values[left - 1]
    if (sum > best) {
      best = sum
      bestStart = left
    }
    steps.push(frame(left === 0 ? 'Seed window' : `Slide to ${left}`, left === 0 ? 'Add the first window' : 'Update the running sum',
      left === 0 ? `Add the first ${width} values. This sum is the first candidate for the maximum.`
        : `Subtract the outgoing value ${values[left - 1]} and add the incoming value ${values[right]}. The new sum is ${sum}.`,
      array(values, {}, { range: [left, right], band: true, equation: `Window sum = ${sum}` }),
      [['Window size', width], ['Current sum', sum], ['Best sum', best]]))
  }
  const indices = Array.from({ length: width }, (_, index) => index + bestStart)
  steps.push(frame('Best window', 'Return the maximum',
    `The best window starts at index ${bestStart}. Its sum is ${best}.`,
    array(values, {}, { range: [bestStart, bestStart + width - 1], band: true, matched: indices, equation: `Maximum = ${best}` }),
    [['Window size', width], ['Best start', bestStart], ['Best sum', best]]))
  return { steps, result: best, bestStart }
}

export function binarySearch(values, target) {
  let lo = 0
  let hi = values.length - 1
  const steps = []
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    const found = values[mid] === target
    const tooLow = values[mid] < target
    steps.push(frame(found ? 'Match' : `Check ${mid}`, found ? 'The middle value matches' : tooLow ? 'Keep the right half' : 'Keep the left half',
      found ? `Index ${mid} contains ${target}. Return this index.`
        : `Index ${mid} contains ${values[mid]}. The sorted order lets you discard index ${mid} and everything to its ${tooLow ? 'left' : 'right'}.`,
      array(values, { [mid]: 'MID' }, {
        range: [lo, hi], matched: found ? [mid] : [],
        equation: `${values[mid]} ${found ? '=' : tooLow ? '<' : '>'} ${target}`,
      }),
      [['Low index', lo], ['High index', hi], ['Mid index', mid]]))
    if (found) return { steps, result: mid }
    if (tooLow) lo = mid + 1
    else hi = mid - 1
  }
  steps.push(frame('Stop', 'The search range is empty', 'Low is greater than High. Return −1.',
    array(values, {}, { range: [lo, hi], equation: 'Not found' }),
    [['Low index', lo], ['High index', hi], ['Result', '−1']]))
  return { steps, result: -1 }
}

export const labPatterns = {
  'two-pointers': { title: 'Two Pointers', values: [1, 2, 4, 6, 8, 12], parameter: 10, field: 'Target sum', sorted: true, trace: twoPointers },
  'sliding-window': { title: 'Sliding Window', values: [2, 1, 5, 1, 3, 2], parameter: 3, field: 'Window size', sorted: false, trace: slidingWindow },
  'binary-search': { title: 'Binary Search', values: [1, 3, 5, 7, 9, 11, 13], parameter: 11, field: 'Target value', sorted: true, trace: binarySearch },
}

export function parseLabInput(pattern, source, parameter) {
  const inputs = source.split(',').map(value => value.trim())
  const values = inputs.map(Number)
  if (values.length < 2 || values.length > 10 ||
      inputs.some(value => !/^-?\d{1,3}$/.test(value))) {
    throw new Error('Enter 2 to 10 comma-separated integers from −999 to 999.')
  }
  if (!/^-?\d{1,4}$/.test(parameter.trim())) {
    throw new Error(`Enter an integer for ${pattern.field.toLowerCase()}.`)
  }
  const number = Number(parameter)
  if (pattern.sorted && values.some((value, index) => index > 0 && value < values[index - 1])) {
    throw new Error('Enter the values in ascending order. Equal values are allowed.')
  }
  if (pattern.field === 'Window size' && (number < 1 || number > values.length)) {
    throw new Error(`Enter a window size from 1 to ${values.length}.`)
  }
  return [values, number]
}

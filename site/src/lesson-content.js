export const step = (label, title, body, scene, stats = []) => ({ label, title, body, scene, stats })
export const code = (...lines) => lines.join('\n')
export const quiz = (question, options, answer, why, exercises) => ({ question, options, answer, why, exercises })

export const row = (values, markers = {}, state = {}) => ({ type: 'array', values, markers, ...state })
export const matrix = (values, caption, options = {}) => ({ type: 'matrix', values, caption, ...options })

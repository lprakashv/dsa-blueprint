import assert from 'node:assert/strict'
import test from 'node:test'
import { trackPageView } from '../site/src/analytics.js'

test('trackPageView does nothing when analytics is disabled', () => {
  const previousWindow = globalThis.window
  try {
    globalThis.window = {}
    assert.doesNotThrow(trackPageView)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test('trackPageView sends the current single-page route', () => {
  const previousWindow = globalThis.window
  const previousDocument = globalThis.document
  const calls = []
  try {
    globalThis.window = {
      gtag: (...args) => calls.push(args),
      location: {
        href: 'https://example.com/dsa-blueprint/#/practice/two-pointers',
        pathname: '/dsa-blueprint/',
        search: '',
        hash: '#/practice/two-pointers'
      }
    }
    globalThis.document = { title: 'DSA Blueprint' }

    trackPageView()

    assert.deepEqual(calls, [[
      'event', 'page_view', {
        page_title: 'DSA Blueprint',
        page_location: 'https://example.com/dsa-blueprint/#/practice/two-pointers',
        page_path: '/dsa-blueprint/#/practice/two-pointers'
      }
    ]])
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
    if (previousDocument === undefined) delete globalThis.document
    else globalThis.document = previousDocument
  }
})

test('trackPageView sends a custom data-layer event for Tag Manager', () => {
  const previousWindow = globalThis.window
  const previousDocument = globalThis.document
  const dataLayer = []
  try {
    globalThis.window = {
      gtag: () => {},
      googleTagManager: true,
      dataLayer,
      location: {
        href: 'https://example.com/dsa-blueprint/#/learn/two-pointers/1',
        pathname: '/dsa-blueprint/',
        search: '',
        hash: '#/learn/two-pointers/1'
      }
    }
    globalThis.document = { title: 'DSA Blueprint' }

    trackPageView()

    assert.deepEqual(dataLayer, [{
      event: 'app_page_view',
      page_title: 'DSA Blueprint',
      page_location: 'https://example.com/dsa-blueprint/#/learn/two-pointers/1',
      page_path: '/dsa-blueprint/#/learn/two-pointers/1'
    }])
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
    if (previousDocument === undefined) delete globalThis.document
    else globalThis.document = previousDocument
  }
})

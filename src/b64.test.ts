import crypto from 'crypto'
import { b64, utf8 } from './index'

test('Base64 codec', () => {
  const expected = 'SGVsbG8sIFdvcmxkICE='
  const received = b64.encode(b64.decode(expected))
  expect(received).toEqual(expected)
})

test('Base64 codec around unicode UTF-8', () => {
  const expected = '👋,🌍 !'
  const received = utf8.decode(b64.decode(b64.encode(utf8.encode(expected))))
  expect(received).toEqual(expected)
})

describe('Base64', () => {
  test('codec is reversible', () => {
    const expected = new Uint8Array(crypto.randomBytes(42))
    const received = b64.decode(b64.encode(expected))
    expect(received).toEqual(expected)
  })
  test('encoding is correct', () => {
    const message = 'Hello, World !'
    const expected = 'SGVsbG8sIFdvcmxkICE='
    const received = b64.encode(utf8.encode(message))
    expect(received).toEqual(expected)
  })
  test('encoding is url-safe', () => {
    const message = '👋🌍'
    const expected = '8J-Ri_CfjI0='
    const received = b64.encode(utf8.encode(message))
    expect(received).toEqual(expected)
  })
  test('trailing `=` are optional for decoding', () => {
    const message = '8J-Ri_CfjI0'
    const expected = '👋🌍'
    const received = utf8.decode(b64.decode(message))
    expect(received).toEqual(expected)
  })
  test('decoding base64 (standard dictionnary) is supported', () => {
    const message = '8J+Ri/CfjI0'
    const expected = '👋🌍'
    const received = utf8.decode(b64.decode(message))
    expect(received).toEqual(expected)
  })

  test('urlSafe', () => {
    expect(b64.urlSafe('')).toEqual('')
    expect(b64.urlSafe('foo')).toEqual('foo')
    expect(b64.urlSafe('foo+bar/egg-spam_qux')).toEqual('foo-bar_egg-spam_qux')
    expect(b64.urlSafe('foo+bar+egg+spam+qux')).toEqual('foo-bar-egg-spam-qux')
    expect(b64.urlSafe('foo/bar/egg/spam/qux')).toEqual('foo_bar_egg_spam_qux')
    expect(b64.urlSafe('foo==')).toEqual('foo==') // Padding is preserved
  })
  test('urlUnsafe', () => {
    expect(b64.urlUnsafe('')).toEqual('')
    expect(b64.urlUnsafe('foo')).toEqual('foo')
    expect(b64.urlUnsafe('foo+bar/egg-spam_qux')).toEqual(
      'foo+bar/egg+spam/qux'
    )
    expect(b64.urlUnsafe('foo-bar-egg-spam-qux')).toEqual(
      'foo+bar+egg+spam+qux'
    )
    expect(b64.urlUnsafe('foo_bar_egg_spam_qux')).toEqual(
      'foo/bar/egg/spam/qux'
    )
    expect(b64.urlUnsafe('foo==')).toEqual('foo==') // Padding is preserved
  })
})

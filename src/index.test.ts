import {
  base64ToHex,
  base64toUTF8,
  detectEncoding,
  hexToBase64url,
  hexToUTF8,
  utf8ToBase64,
  utf8ToHex
} from './index'

test('base64 -> hex', () => {
  const provided = 'SGVsbG8sIHdvcmxkIQ=='
  const expected = '48656c6c6f2c20776f726c6421'
  const received = base64ToHex(provided)
  expect(received).toEqual(expected)
})
test('hex -> base64', () => {
  const provided = '48656c6c6f2c20776f726c6421'
  const expected = 'SGVsbG8sIHdvcmxkIQ=='
  const received = hexToBase64url(provided)
  expect(received).toEqual(expected)
})
test('utf8 -> base64', () => {
  const provided = 'Hello, world!'
  const expected = 'SGVsbG8sIHdvcmxkIQ=='
  const received = utf8ToBase64(provided)
  expect(received).toEqual(expected)
})
test('base64 -> utf8', () => {
  const provided = 'SGVsbG8sIHdvcmxkIQ=='
  const expected = 'Hello, world!'
  const received = base64toUTF8(provided)
  expect(received).toEqual(expected)
})
test('utf8 -> hex', () => {
  const provided = 'Hello, world!'
  const expected = '48656c6c6f2c20776f726c6421'
  const received = utf8ToHex(provided)
  expect(received).toEqual(expected)
})
test('hex -> utf8', () => {
  const provided = '48656c6c6f2c20776f726c6421'
  const expected = 'Hello, world!'
  const received = hexToUTF8(provided)
  expect(received).toEqual(expected)
})

describe('detect encoding', () => {
  test('hex', () => {
    expect(detectEncoding('baadf00dcafebabefacade42')).toEqual('hex')
    expect(detectEncoding('BAADF00DCAFEBABEFACADE42')).toEqual('hex')
    expect(detectEncoding('BaAdF00dCaFeBaBeFaCaDe42')).toEqual('hex')
  })
  test('base64', () => {
    expect(detectEncoding('SGVsbG8sIHdvcmxkIQ==')).toEqual('base64')
    expect(detectEncoding('foo+bar/egg')).toEqual('base64')
    expect(detectEncoding('foo+bar/egg=')).toEqual('base64')
    expect(detectEncoding('foo+bar/egg==')).toEqual('base64')
    expect(detectEncoding('foo+bar/egg===')).not.toEqual('base64') // too much padding
    expect(detectEncoding('foo-bar_egg')).toEqual('base64')
    expect(detectEncoding('foo-bar_egg=')).toEqual('base64')
    expect(detectEncoding('foo-bar_egg==')).toEqual('base64')
    expect(detectEncoding('foo-bar_egg===')).not.toEqual('base64') // too much padding
  })
  test('utf8', () => {
    expect(detectEncoding('not base64 or hex')).toEqual('utf8')
  })
})

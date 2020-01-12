import { b64, utf8, hex } from './index'

test('UTF-8 codec, ASCII', () => {
  const expected = 'Hello, World !'
  const received = utf8.decode(utf8.encode(expected))
  expect(received).toEqual(expected)
})

test('UTF-8 codec, Unicode', () => {
  const expected = '👋,🌍 !'
  const received = utf8.decode(utf8.encode(expected))
  expect(received).toEqual(expected)
})

// --

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

// --

test('Hex codec', () => {
  const expected = '48656c6c6f2c20576f726c642021'
  const received = hex.encode(hex.decode(expected))
  expect(received).toEqual(expected)
})

test('Hex codec around unicode UTF-8', () => {
  const expected = '👋,🌍 !'
  const received = utf8.decode(hex.decode(hex.encode(utf8.encode(expected))))
  expect(received).toEqual(expected)
})

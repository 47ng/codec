import { utf8 } from './index'

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

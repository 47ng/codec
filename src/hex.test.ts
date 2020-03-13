import { utf8, hex } from './index'

test('Hex codec', () => {
  const supplied = '48656C6C6F2C20576f726c642021'
  const expected = '48656c6c6f2c20576f726c642021'
  const received = hex.encode(hex.decode(supplied))
  expect(received).toEqual(expected)
})

test('Hex codec on odd number of digits (zero left-pad)', () => {
  const supplied = 'f'
  const expected = '0f'
  const received = hex.encode(hex.decode(supplied))
  expect(received).toEqual(expected)
})

test('Hex codec around unicode UTF-8', () => {
  const expected = '👋,🌍 !'
  const received = utf8.decode(hex.decode(hex.encode(utf8.encode(expected))))
  expect(received).toEqual(expected)
})

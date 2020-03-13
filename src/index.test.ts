import { base64ToHex, hexToBase64url } from './index'

test('base64 -> hex', () => {
  const provided = 'SGVsbG8sIFdvcmxkICE='
  const expected = '48656c6c6f2c20576f726c642021'
  const received = base64ToHex(provided)
  expect(received).toEqual(expected)
})
test('hex -> base64', () => {
  const provided = '48656c6c6f2c20576f726c642021'
  const expected = 'SGVsbG8sIFdvcmxkICE='
  const received = hexToBase64url(provided)
  expect(received).toEqual(expected)
})

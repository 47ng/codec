import crypto from 'crypto'
import { b64, utf8, hex, base64ToHex, hexToBase64url } from './index'

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

describe('Codecs', () => {
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
  })

  test('UTF-8', () => {
    const expected = 'Hello, world ! 👋🌍'
    const received = utf8.decode(utf8.encode(expected))
    expect(received).toEqual(expected)
  })
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
})

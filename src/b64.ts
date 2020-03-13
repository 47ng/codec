import { encodeURLSafe, decodeURLSafe } from '@stablelib/base64'

const b64 = {
  urlSafe: (str: string) => str.replace(/\+/g, '-').replace(/\//g, '_'),
  urlUnsafe: (str: string) => str.replace(/\-/g, '+').replace(/\_/g, '/'),
  encode: function b64Encode(input: Uint8Array): string {
    if (typeof Buffer !== 'undefined') {
      return b64.urlSafe(Buffer.from(input, 0, input.length).toString('base64'))
    }
    return encodeURLSafe(input)
  },
  decode: function b64Decode(input: string): Uint8Array {
    if (typeof Buffer !== 'undefined') {
      const buf = Buffer.from(input, 'base64')
      return new Uint8Array(buf, 0, buf.length)
    }
    return decodeURLSafe(b64.urlSafe(input))
  }
}

export default b64

import { encode as encodeHex, decode as decodeHex } from '@stablelib/hex'

const hex = {
  encode: function HexEncode(input: Uint8Array): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input, 0, input.length).toString('hex')
    }
    const lowerCase = true
    return encodeHex(input, lowerCase)
  },
  decode: function HexDecode(input: string): Uint8Array {
    if (input.length % 2 !== 0) {
      input = '0' + input
    }
    if (typeof Buffer !== 'undefined') {
      const buf = Buffer.from(input, 'hex')
      return new Uint8Array(buf, 0, buf.length)
    }
    return decodeHex(input)
  }
}

export default hex

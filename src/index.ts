import { encodeURLSafe, decodeURLSafe } from '@stablelib/base64'
import { encode as encodeHex, decode as decodeHex } from '@stablelib/hex'

export const b64 = {
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

const utf8Encoder = new TextEncoder()
const utf8Decoder = new TextDecoder()

export const utf8 = {
  decode: function Utf8Decode(input: Uint8Array): string {
    return utf8Decoder.decode(input)
  },
  encode: function Utf8Encode(input: string): Uint8Array {
    const buf = utf8Encoder.encode(input)
    return new Uint8Array(buf, 0, buf.length)
  }
}

export const hex = {
  encode: function HexEncode(input: Uint8Array): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input, 0, input.length).toString('hex')
    }
    return encodeHex(input, true)
  },
  decode: function HexDecode(input: string): Uint8Array {
    if (typeof Buffer !== 'undefined') {
      const buf = Buffer.from(input, 'hex')
      return new Uint8Array(buf, 0, buf.length)
    }
    return decodeHex(input)
  }
}

// --

export const hexToBase64url = (input: string) => {
  return b64.encode(hex.decode(input))
}

export const base64ToHex = (base64: string) => {
  return hex.encode(b64.decode(base64))
}

// --

export type Encoder = (buffer: Uint8Array) => string
export type Decoder = (string: string) => Uint8Array
export type Encoding = 'base64' | 'utf8' | 'hex'
export type Encoders = {
  [key in Encoding]: Encoder
}
export type Decoders = {
  [key in Encoding]: Decoder
}

export const encoders: Encoders = {
  base64: b64.encode,
  utf8: utf8.decode,
  hex: hex.encode
}
export const decoders: Decoders = {
  base64: b64.decode,
  utf8: utf8.encode,
  hex: hex.decode
}

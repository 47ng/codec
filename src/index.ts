import hex from './hex'
import b64 from './b64'
import utf8 from './utf8'

export { hex, b64, utf8 }

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

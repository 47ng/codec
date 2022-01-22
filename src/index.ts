import b64 from './b64'
import hex from './hex'
import utf8 from './utf8'

export { hex, b64, utf8 }

// --

export function hexToBase64url(input: string) {
  return b64.encode(hex.decode(input))
}
export function base64ToHex(base64: string) {
  return hex.encode(b64.decode(base64))
}
export function utf8ToBase64(input: string) {
  return b64.encode(utf8.encode(input))
}
export function base64toUTF8(input: string) {
  return utf8.decode(b64.decode(input))
}
export function utf8ToHex(input: string) {
  return hex.encode(utf8.encode(input))
}
export function hexToUTF8(input: string) {
  return utf8.decode(hex.decode(input))
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

export function detectEncoding(input: string): Encoding {
  const hex = /^[\dabcdef]+$/i
  const b64 = /^[a-z0-9+/]+[=]{0,2}$/i // RFC3548 Section 3 (uses +/)
  const b64url = /^[\w\-]+[=]{0,2}$/ // // RFC3548 Section 4 (uses -_)
  if (hex.test(input)) {
    return 'hex'
  }
  if (b64url.test(input) || b64.test(input)) {
    return 'base64'
  }
  return 'utf8'
}

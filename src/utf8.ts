const utf8Encoder = new TextEncoder()
const utf8Decoder = new TextDecoder()

const utf8 = {
  decode: function Utf8Decode(input: Uint8Array): string {
    return utf8Decoder.decode(input)
  },
  encode: function Utf8Encode(input: string): Uint8Array {
    const buf = utf8Encoder.encode(input)
    return new Uint8Array(buf, 0, buf.length)
  }
}

export default utf8

<h1 align="center"><code>@47ng/codec</code></h1>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@47ng/codec?color=red)](https://www.npmjs.com/package/@47ng/codec)
[![MIT License](https://img.shields.io/github/license/47ng/codec.svg?color=blue)](https://github.com/47ng/codec/blob/master/LICENSE)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/47ng/codec/Continuous%20Integration/next?label=CI)
[![Coverage Status](https://coveralls.io/repos/github/47ng/codec/badge.svg?branch=next)](https://coveralls.io/github/47ng/codec?branch=next)
![NPM Downloads](https://img.shields.io/npm/dm/@47ng/codec)

</div>

<p align="center">
  Universal conversion of Uint8Array from/into UTF-8, base64url and hex in the browser and Node.js
</p>

## Features

Available codecs:

- `utf8` - UTF-8
- `b64` - Base 64 URL ([RFC-4648, Section 5](https://tools.ietf.org/html/rfc4648#section-5))
- `hex` - Hexadecimal, lowercase
- Simple conversion between string representation
- Encoding detection

> Watch out !
> `utf8` uses a different convention than the other codecs (encode and decode
> are swapped), to reflect how `TextEncoder` and `TextDecoder` behave.

## Installation

```shell
$ yarn add @47ng/codec
# or
$ npm i @47ng/codec
```

## Support

- Node.js: >=11.x
- Browser: See [caniuse](https://caniuse.com/#feat=textencoder) for `TextEncoder` / `TextDecoder`

## Examples

```ts
import { b64, hex, utf8 } from '@47ng/codec'

b64.encode(utf8.encode('Hello, World !')) // SGVsbG8sIFdvcmxkICE=
hex.encode(b64.decode('SGVsbG8sIFdvcmxkICE=')) // 48656c6c6f2c20576f726c642021
utf8.decode(hex.decode('48656c6c6f2c20576f726c642021')) // Hello, World !

b64.decode('SGVsbG8sIFdvcmxkICE=') // <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 20 21>
```

## Documentation

### UTF-8

- `utf8.encode`: Convert an UTF-8 string into an array of bytes (Uint8Array)
- `utf8.decode`: Convert an array of bytes into an UTF-8 string

Examples:

```ts
import { utf8 } from '@47ng/codec'

const uint8Array = utf8.encode('Hello, World!')
// Uint8Array [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]

const backToText = utf8.decode(uint8Array)
// 'Hello, World!'
```

### Base 64

- `b64.encode`: Convert an array of bytes into a base64url string
- `b64.decode`: Convert a base64 string into an array of bytes
- `b64.urlSafe`: Convert a standard base64 string to base64url
- `b64.urlUnsafe`: Convert a base64url string to standard base64 dictionary

> _**Note**_: For decoding, any dictionary is supported, and trailing padding (`=`) is optional.

Examples:

```ts
import { b64, utf8 } from '@47ng/codec'

const uint8Array = b64.decode('8J-Ri_CfjI0')
// Uint8Array [240, 159, 145, 139, 240, 159, 140, 141]

// Encoding always emits padding
const backToBase64 = b64.encode(uint8Array)
// '8J-Ri_CfjI0='

const asText = utf8.decode(uint8Array)
// '👋🌍'
```

### Hex

- `hex.encode`: Convert an array of bytes into a hex string
- `hex.decode`: Convert a hex string into an array of bytes

> _**Note**_: Decoding accepts any case (lowercase, uppercase, mixed).

Examples:

```ts
import { hex } from '@47ng/codec'

const uint8Array = hex.decode('48656C6C6F2C20576f726c642021')
// Uint8Array [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]

// Encoding is always lowercase
const backToBase64 = hex.encode(uint8Array)
// '48656c6c6f2c20576f726c642021'
```

### Utilities

The library exports convenience methods for converting from one string
representation to another:

```ts
import {
  hexToBase64url,
  base64ToHex,
  utf8ToBase64,
  base64toUTF8,
  utf8ToHex,
  hexToUTF8
} from '@47ng/codec'

base64ToHex('SGVsbG8sIFdvcmxkICE=')
// 48656c6c6f2c20576f726c642021

hexToBase64url('48656c6c6f2c20576f726c642021')
// SGVsbG8sIFdvcmxkICE=

utf8ToBase64('Hello, World !')
// SGVsbG8sIFdvcmxkICE=

base64toUTF8('SGVsbG8sIFdvcmxkICE=')
// Hello, World !

utf8ToHex('Hello, World !')
// 48656c6c6f2c20576f726c642021

hexToUTF8('48656c6c6f2c20576f726c642021')
// Hello, World !
```

It also exports encoder / decoder objects with strong TypeScript types, to help you
build your own encoders & decoders:

```ts
import { encoders, decoders, Encoding } from '@47ng/codec'

// type Encoding = 'base64' | 'utf8' | 'hex'

function convert(
  input: string,
  inputEncoding: Encoding,
  outputEncoding: Encoding
): string {
  const decoder = decoders[inputEncoding]
  const encoder = encoders[outputEncoding]
  return encoder(decoder(input))
}

convert('Hello, World!', 'utf8', 'base64')
// SGVsbG8sIFdvcmxkICE

convert('Hello, World!', 'utf8', 'hex')
// 48656c6c6f2c20576f726c642021
```

You can detect the encoding of a string:

```ts
import { detectEncoding } from '@47ng/codec'

detectEncoding('baadf00dcafebabe') // hex

// Both variants of base64 are detected
detectEncoding('SGVs+G8s/FdvcmxkICE=') // base64
detectEncoding('SGVs-G8s_FdvcmxkICE=') // base64

detectEncoding('not hex not base64') // utf8
```

## License

[MIT](https://github.com/47ng/codec/blob/master/LICENSE) - Made with ❤️ by
[François Best](https://francoisbest.com).

Using this package at work ? [Sponsor me](https://github.com/sponsors/franky47) to help with support and maintenance.

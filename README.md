# `@47ng/codec`

[![NPM](https://img.shields.io/npm/v/@47ng/codec?color=red)](https://www.npmjs.com/package/@47ng/codec)
[![MIT License](https://img.shields.io/github/license/47ng/codec.svg?color=blue)](https://github.com/47ng/codec/blob/master/LICENSE)
[![Travis CI Build](https://img.shields.io/travis/com/47ng/codec.svg)](https://travis-ci.com/47ng/codec)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=47ng/codec)](https://dependabot.com)
[![Average issue resolution time](https://isitmaintained.com/badge/resolution/47ng/codec.svg)](https://isitmaintained.com/project/47ng/codec)
[![Number of open issues](https://isitmaintained.com/badge/open/47ng/codec.svg)](https://isitmaintained.com/project/47ng/codec)

Universal conversion of Uint8Array from/into UTF-8, base64url and hex in the browser and Node.js

## Installation

```shell
$ yarn add @47ng/codec
# or
$ npm i @47ng/codec
```

## Documentation

Available codecs:

- `utf8` - UTF-8
- `b64` - Base 64 URL ([RFC-4648, Section 5](https://tools.ietf.org/html/rfc4648#section-5))
- `hex` - Hexadecimal, lowercase

> Watch out !
> `utf8` uses a different convention than the other codecs (encode and decode
> are swapped), to reflect how `TextEncoder` and `TextDecoder` behave.

## Example

```ts
import { b64, hex, utf8 } from '@47ng/codec'

b64.encode(utf8.encode('Hello, World !')) // SGVsbG8sIFdvcmxkICE=
hex.encode(b64.decode('SGVsbG8sIFdvcmxkICE=')) // 48656c6c6f2c20576f726c642021
utf8.decode(hex.decode('48656c6c6f2c20576f726c642021')) // Hello, World !

b64.decode('SGVsbG8sIFdvcmxkICE=') // <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 20 21>
```

## License

[MIT](https://github.com/47ng/codec/blob/master/LICENSE) - Made with ❤️ by [François Best](https://francoisbest.com).

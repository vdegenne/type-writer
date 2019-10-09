# type-writer

Web Component that simulates someone typing live on the keyboard.

## Usage

```html
<type-writer>
  <span slot="line">This is the first line</span>
  <span slot="line">This is a second line</span>
  <span slot="line">This is the last line</span>
</type-writer>
```

[Demo](https://type-writer.glitch.me/)

## Installation

```npm i type-writer```

To use it, you can use a server that resolve node module live, and directly use it in your page :
```html
<script type="module" src="/node_modules/type-writer"></script>
```

Or in your application (e.g. typescript)
```typescript
import 'type-writer'
```

## Options (with defaults)

```html
<type-writer
  loop="false" <!-- should we start again after last line is written -->
  speedMultiplier="1" <!-- 2 times faster, use 0.5 to slow 2 times-->
  timeBetween="3" <!-- time to wait before jumping on the next line (seconds) -->
  caretBlinkingSpeed="600" <!-- speed of the caret blinking (milliseconds) -->
>
  <span slot="line">...</span>
  <span slot="line">...</span>
  <span slot="line">...</span>
  ...
</type-writer>
```

## Demo

To try this live :
- clone this repository
- install the dependencies : `npm i`
- run the demo: `npm run demo`

## Contact

vdegenne (at) gmail (dot) com
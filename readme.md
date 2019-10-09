# @vdegenne/type-writer

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

### Styles

You can style the element using basic css :
```html
<style>
  type-writer {
    color: red;
    font-size: 20px;
  }
</style>
```

You can also chose a color for the caret :
```html
<style>
  type-write {
    --caret-color: red;
  }
</style>
```


## Installation

```npm i @vdegenne/type-writer```

To use it, you can use a server that resolve node module live, and directly use it in your page :
```html
<script type="module" src="/node_modules/@vdegenne/type-writer.js"></script>
```

Or in your application (e.g. typescript)
```typescript
import '@vdegenne/type-writer'
```

## Options (with defaults)

```html
<type-writer
  loop="false" <!-- should we start again after last line is written ? -->
  speedMultiplier="1" <!-- use 2 to speed 2 times, use 0.5 to slow 2 times -->
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
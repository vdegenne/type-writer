import { LitElement, customElement, property, query, html } from 'lit-element'

@customElement('type-writer')
class TypeWriter extends LitElement {

  /**
   * speed multiplier
   * e.g. set "2" to make the speed 2 times faster than the initial behavior)
   * or "0.5" to make it two times slower
   */
  @property({ type: Number })
  speedMultiplier = 1
  
  /**
   * The speed of the caret blink (milliseconds)
   */
  @property({ type: Number })
  caretBlinkingSpeed = 600

  /**
   * Interval between the lines (in seconds)
   */
  @property({ type: Number })
  timeBetween = 3

  /**
   * loop when all the line were written ?
   */
  @property({ type: Boolean })
  loop = false

  _lines: Array<string> = []
  _currentLine: string = ''
  _typing: boolean = false
  _caretBlinkingInterval: number|undefined = undefined

  @query('#line-container')
  lineContainer!: HTMLSpanElement

  @query('#caret')
  caret!: HTMLSpanElement

  @query('slot[name=line]')
  lineSlot!: HTMLSlotElement

  render() {
    return html`
    <style>
      :host {
        display: inline-flex;
        --caret-color: #424242;
      }
      #caret {
        width: 2px;
        margin-left: 0px;
        background: var(--caret-color);
        transition: opacity .1s linear;
        opacity: 1;
      }
    </style>
    <slot name="line" style="display:none"></slot>
    <span id="line-container"></span><span id="caret"></span>
    `
  }

  resetCaretBlink() {
    this.caret.style.opacity = '0'
    if (this._caretBlinkingInterval) {
      clearInterval(this._caretBlinkingInterval)
      this._caretBlinkingInterval = undefined
    }
    this._caretBlinkingInterval = setInterval(() => this.toggleCaret(), this.caretBlinkingSpeed)
  }

  toggleCaret() {
    if (this.caret.style.opacity !== '0') {
      this.caret.style.opacity = '0'
    }
    else {
      this.caret.style.opacity = '1'
    }
  }

  /**
   * Returns a random number between from and to (both included)
   */
  random(from: number, to: number) {
    return Math.floor(Math.random() * ((to + 1) - from) + from)
  }
  sleep(milliseconds:number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async throwLetters() {
    this.resetCaretBlink()
    const typeCount = (this.lineContainer.textContent as string).length
    const lettersLength = this.random(1, 7)
    const nextLetters = this._currentLine.substr(typeCount, lettersLength)
    for (const letter of nextLetters) {
      // waiting between each stroke
      await this.sleep(this.random(50, 120) / this.speedMultiplier)
      this.lineContainer.textContent += letter
    }
    // returns an indicator are there more letters to throw
    return typeCount + lettersLength < this._currentLine.length
  }

  async start() {
    this._typing = true
    let still
    while (this._typing) {
      // we wait between throwing lettes to mimic someone thinking between strokes
      await this.sleep(this.random(500, 800) / this.speedMultiplier)
      still = await this.throwLetters()
      if (!still) {
        // Should jump on the next line if there is one 
        // or jump on the first line if "loop" is true
        const currentLineIndex = this._lines.indexOf(this._currentLine)
        if (currentLineIndex + 1 < this._lines.length) {
          this._currentLine = this._lines[currentLineIndex + 1]
        }
        else if (this.loop) {
          this._currentLine = this._lines[0]
        }
        else {
          this.stop()
          return
        }
        await this.sleep(this.timeBetween * 1000)
        this.lineContainer.textContent = ''
      }
    }
  }

  stop() {
    this._typing = false
  }

  firstUpdated() {
    this.lineSlot.addEventListener('slotchange', () => () => {
      this.stop()
      this._init()
    })
    // first init
    this._init()
  }

  _init() {
    this._lines = [...this.querySelectorAll('[slot=line]')].map(element => (element.textContent as string).trim())
    this._currentLine = this._lines[0]
    this.start()
  }
}

const values: (string | null)[] = [
  'Ace',
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  'Page',
  'Knight',
  'Queen',
  'King',
  'The Fool',
  'The Magician',
  'The High Priestess',
  'The Empress',
  'The Emporer',
  'The Hierophant',
  'The Lovers',
  'The Chariot',
  'Strength',
  'The Hermit',
  'Wheel of Fortune',
  'Justice',
  'The Hanged Man',
  'Death',
  'Temperance',
  'The Devil',
  'The Tower',
  'The Star',
  'The Moon',
  'The Sun',
  'Judgement',
  'The World',
]

const suits: {
  [style: string]: [
    hearts: string,
    spades: string,
    clubs: string,
    diamonds: string,
  ]
} = {
  default: ['cups', 'swords', 'wands', 'coins'],
  poker: ['hearts', 'spades', 'clubs', 'diamonds'],
  tarot: ['cups', 'swords', 'wands', 'coins'],
  tarotSecondary: ['chalices', 'swords', 'wands', 'pentacles'],
  tarotTertiary: ['cups', 'swords', 'wands', 'disks'],
}

export class Card {
  readonly valueNumber: number
  readonly valueString: string
  readonly style: string

  constructor(value: number, style: string = 'tarot') {
    this.valueNumber = value
    this.valueString = values[this.valueNumber] || `${this.valueNumber + 1}`
    this.style = style
  }

  applyStyle = (style: string): Card => new Card(this.valueNumber, style)
  toString = (): string => `${this.valueString}`
}

export class MinorArcanaCard extends Card {
  readonly suitNumber: number
  readonly suitString: string

  constructor(value: number, suit: number, style: string = 'tarot') {
    super(value)

    this.suitNumber = suit
    this.suitString = suits.tarot[this.suitNumber] || 'Unknown'
  }

  applyStyle = (style: string): MinorArcanaCard =>
    new MinorArcanaCard(this.valueNumber, this.suitNumber, style)

  toString = (): string => `${this.valueString} of ${this.suitString}`
}

export class MajorArcanaCard extends Card {
  constructor(value: number) {
    super(value)
  }
}

const minorArcanaCards: readonly MinorArcanaCard[] = Object.freeze(
  new Array(56)
    .fill(null)
    .map((v, i) =>
      Object.freeze(
        new MinorArcanaCard(i - Math.floor(i / 14) * 14, Math.floor(i / 14)),
      ),
    ),
)

const majorArcanaCards: readonly MajorArcanaCard[] = Object.freeze(
  new Array(22)
    .fill(null)
    .map((v, i) => Object.freeze(new MajorArcanaCard(i + 14))),
)

const defaultCards: readonly Card[] = Object.freeze([
  ...minorArcanaCards,
  ...majorArcanaCards,
])

type TarotDeckEventType = 'update'

export class TarotDeck {
  cards: Card[] = [...defaultCards]
  originalCards: readonly Card[] = this.cards
  discardPile: Card[] = []

  suitStyle: string
  valueStyle: string

  events: Record<TarotDeckEventType, (() => void)[]> = {
    update: [],
  }

  constructor(
    style: string | { suit: string; value: string } = 'tarot',
    cards?: Card[],
  ) {
    if (typeof style === 'string') {
      this.suitStyle = style
      this.valueStyle = style
    } else {
      this.suitStyle = style.suit
      this.valueStyle = style.value
    }

    this.cards =
      cards || defaultCards.map((card) => card.applyStyle(this.valueStyle))
    this.originalCards = Object.freeze([...this.cards])

    this.shuffle()
  }

  // TODO: Decide if this should be deferred
  // #triggerDeferTimeout?: number
  #trigger(type: TarotDeckEventType): void {
    // window.clearTimeout(this.#triggerDeferTimeout)
    // this.#triggerDeferTimeout = window.setTimeout((): void => {
    this.events[type].forEach((e) => e())
    //   this.#triggerDeferTimeout = undefined
    // }, 0)
  }

  on(type: TarotDeckEventType, call: () => void): void {
    this.events[type].push(call)
  }

  off(type: TarotDeckEventType, call: () => void): void {
    this.events[type] = this.events[type].filter(
      (e: () => void): boolean => e !== call,
    )
  }

  async when(type: TarotDeckEventType): Promise<void> {
    const onAndOff = (resolve: () => void): void => {
      const offAndResolve = (): void => {
        this.off(type, offAndResolve)

        resolve()
      }

      this.on(type, offAndResolve)
    }

    await new Promise<void>(onAndOff)
  }

  reset(sorted: boolean = false): void {
    if (sorted) this.cards.splice(0, this.cards.length, ...this.originalCards)
    else this.shuffle(true)

    this.#trigger('update')
  }

  shuffle(resetDiscard: boolean = false): void {
    if (resetDiscard) this.cards.push(...this.discardPile.splice(0))

    this.cards.sort(() => Math.random() * 10 - 5)

    this.#trigger('update')
  }

  drawRandomly(): Card | null {
    if (!this.cards.length) return null

    this.discardPile.push(
      this.cards.splice(
        Math.floor(Math.random() * (this.cards.length - 1)),
        1,
      )[0],
    )

    this.#trigger('update')

    return this.discardPile[this.discardPile.length - 1]
  }

  drawFromTop(): Card | null {
    if (!this.cards.length) return null

    this.discardPile.push(this.cards.shift() as Card)

    this.#trigger('update')

    return this.discardPile[this.discardPile.length - 1]
  }

  drawFromMiddle(): Card | null {
    if (!this.cards.length) return null

    this.discardPile.push(
      this.cards.splice(Math.floor((this.cards.length - 1) / 2), 1)[0],
    )

    this.#trigger('update')

    return this.discardPile[this.discardPile.length - 1]
  }

  drawFromBottom(): Card | null {
    if (!this.cards.length) return null

    this.discardPile.push(this.cards.pop() as Card)

    this.#trigger('update')

    return this.discardPile[this.discardPile.length - 1]
  }
}

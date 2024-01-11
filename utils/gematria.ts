export const gematriaMethods = ['direct'] as const
export type GematriaMethod = (typeof gematriaMethods)[number]

export const ignoreCaseDirections = ['Upper', 'Lower'] as const
export type IgnoreCaseDirection = (typeof ignoreCaseDirections)[number]

export interface DecodeOptions {
  method: GematriaMethod
  ignoreCase: boolean
  ignoreCaseDirection: IgnoreCaseDirection
}

export const defaultDecodeOptions: DecodeOptions = {
  method: 'direct',
  ignoreCase: true,
  ignoreCaseDirection: 'Upper',
}

export function decode(
  encodedString: string,
  options: DecodeOptions = defaultDecodeOptions,
): number[] {
  options = { ...defaultDecodeOptions, ...options }

  if (options.ignoreCase) {
    if (options.ignoreCaseDirection === 'Upper') {
      encodedString = encodedString.toUpperCase()
    } else if (options.ignoreCaseDirection === 'Lower') {
      encodedString = encodedString.toLowerCase()
    } else {
      throw new Error(
        `Unknown ignoreCaseDirection: ${options.ignoreCaseDirection}`,
      )
    }
  }

  let decodedValues: number[] = []

  switch (options.method) {
    case 'direct':
      decodedValues = encodedString.split('').map((c) => c.charCodeAt(0))
      break
    default:
      throw new Error('Unknown gematria method')
  }

  return decodedValues
}

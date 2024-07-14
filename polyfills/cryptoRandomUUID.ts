import { UUID } from 'crypto'

export function cryptoRandomUUIDPolyfill(): UUID {
  return '10000000-1000-4000-8000-100000000000'.replace(
    /[018]/g,
    function (character: string): string {
      const characterInt: number = parseInt(character)
      return (
        characterInt ^
        (crypto.getRandomValues(new Uint8Array(1))[0] &
          (characterInt === 8 ? 3 : 15))
      ).toString(16)
    },
  ) as UUID
}

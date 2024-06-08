import fs from 'fs'
import path from 'path'

async function main(): Promise<void> {
  const sumInput = parseFloat(process.argv[3] ?? '0')

  if (
    !sumInput ||
    sumInput < 0 ||
    Number.isNaN(sumInput) ||
    sumInput !== Math.floor(sumInput)
  ) {
    console.error('Pass in a positive integer')
  }

  const dataBuffer: Buffer = await new Promise((resolve) =>
    fs.readFile(
      path.join(__dirname, '../', 'data/gematria.json'),
      (err: NodeJS.ErrnoException | null, data: Buffer): void => {
        if (err) throw err

        resolve(data)
      },
    ),
  )

  const data: Record<string, { decodedValues: number[]; decodedSum: number }> =
    JSON.parse(dataBuffer.toString('utf-8'))

  for (const encodedValue in data) {
    if (data[encodedValue].decodedSum === sumInput) {
      console.log(encodedValue, data[encodedValue].decodedValues)
    }
  }
}

main()

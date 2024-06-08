import fs from 'fs'
import path from 'path'

interface DecodedData {
  decodedValues: number[]
  decodedSum: number
}

const inputPath: string = path.resolve(
  __dirname,
  '../',
  'data',
  'gematria.json',
)
const outputDir: string = path.join(__dirname, '../data/gematria')

async function main(): Promise<void> {
  const dataBuffer: string = await new Promise((resolve) =>
    fs.readFile(
      inputPath,
      { encoding: 'utf-8' },
      (
        err: NodeJS.ErrnoException | null,
        data: string | PromiseLike<string>,
      ): void => {
        if (err) throw err

        resolve(data)
      },
    ),
  )

  const data: Record<string, DecodedData> = JSON.parse(dataBuffer)
  const lookupData: Record<number, string> = {}

  for (const encodedValue in data) {
    if (!lookupData[data[encodedValue].decodedSum]) {
      lookupData[data[encodedValue].decodedSum] = ''
    }

    lookupData[
      data[encodedValue].decodedSum
    ] += `${encodedValue} : ${JSON.stringify(
      data[encodedValue].decodedValues,
    )}\n`
  }

  for (const decodedSum in lookupData) {
    const outputPath: string = path.join(outputDir, `${decodedSum}.txt`)

    await new Promise<void>((resolve: () => void): void =>
      fs.writeFile(
        outputPath,
        lookupData[decodedSum],
        { encoding: 'utf-8' },
        (err: NodeJS.ErrnoException | null): void => {
          if (err) throw err
          resolve()
        },
      ),
    )
  }
}

main()

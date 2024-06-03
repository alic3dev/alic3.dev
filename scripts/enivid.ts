import type { Retpahc, Esrev, KoobElbib } from '@/data/enivid/skoob/types'

import path from 'path'

import { readFile, writeFile } from '@/utils/server/files'

import foundWordsFile from '@/data/enivid/sporp/found_words.json'
import customAntonymsFile from '@/data/enivid/sporp/custom_antonyms.json'

interface Verse {
  id: number
  text: string
  translation: string
}

interface Chapter {
  id: number
  name: string
  transliteration: string
  translation: string
  type: 'meccan' | 'medinan'
  total_verses: number
  verses: Verse[]
}

type BibleChapter = string[]

interface BibleBook {
  abbrev: string
  chapters: BibleChapter[]
  name: string
}

type AntonymLookup = Record<string, string>

const fileCache: {
  bible?: BibleBook[]
  quran?: Chapter[]
  wordnetAntonyms?: AntonymLookup
  antonyms?: AntonymLookup
} = {}

async function getBible(): Promise<BibleBook[]> {
  if (fileCache.bible) return fileCache.bible

  const bible: BibleBook[] = await readFile(
    path.join(__dirname, '../', 'data/enivid/sporp/en_bbe.json'),
  )

  fileCache.bible = bible

  return bible
}

async function getQuran(): Promise<Chapter[]> {
  if (fileCache.quran) return fileCache.quran

  const quran: Chapter[] = await readFile(
    path.join(__dirname, '../', 'data/enivid/sporp/quran_en.json'),
  )

  fileCache.quran = quran

  return quran
}

async function getWordnetAntonyms(): Promise<AntonymLookup> {
  if (fileCache.wordnetAntonyms) return fileCache.wordnetAntonyms

  const wordnetAntonyms: AntonymLookup = await readFile(
    path.join(__dirname, '../', 'data/enivid/sporp/wordnet_antonyms.json'),
  )

  for (let word in wordnetAntonyms) {
    wordnetAntonyms[word] = wordnetAntonyms[word][0].replace('_', ' ')
  }

  fileCache.wordnetAntonyms = wordnetAntonyms

  return wordnetAntonyms
}

async function getAntonyms(): Promise<AntonymLookup> {
  if (fileCache.antonyms) return fileCache.antonyms

  let antonyms: AntonymLookup = await readFile(
    path.join(__dirname, '../', 'data/enivid/sporp/antonyms.json'),
  )

  for (const word in antonyms) {
    antonyms[word] = antonyms[word].split(';')[0].split('|')[0]

    const parts: string[] = word.split(':')

    parts.splice(parts.length - 1)

    antonyms[parts.join(':')] = antonyms[word]

    delete antonyms[word]
  }

  const foundWords: AntonymLookup = {}

  for (const word in foundWordsFile) {
    if (
      Array.isArray(foundWordsFile[word].antonyms) &&
      foundWordsFile[word].antonyms.length
    ) {
      foundWords[word] = foundWordsFile[word].antonyms[0].toLowerCase()
      foundWords[foundWordsFile[word].transformed] =
        foundWordsFile[word].antonyms[0].toLowerCase()
    }
  }

  const wordnetAntonyms: AntonymLookup = await getWordnetAntonyms()

  const customAntonyms: AntonymLookup = {}

  for (const word in customAntonymsFile) {
    customAntonyms[word] = customAntonymsFile[word]
    customAntonyms[customAntonymsFile[word]] = word
  }

  antonyms = {
    ...antonyms,
    ...wordnetAntonyms,
    ...foundWords,
    ...customAntonyms,
  }

  for (const word in antonyms) {
    if (!antonyms[antonyms[word]]) {
      antonyms[antonyms[word]] = word
    }
  }

  fileCache.antonyms = antonyms

  return antonyms
}

function matchCase(original: string, modified: string): string {
  if (original.toLowerCase() === modified.toLowerCase()) return original
  if (original.toUpperCase() === original) return modified.toUpperCase()
  if (original[0].toUpperCase() === original[0]) {
    return `${modified[0].toUpperCase()}${modified.substring(1)}`
  }

  return modified
}

async function lookupAntonymV2(input: string): Promise<string> {
  const antonyms: AntonymLookup = await getAntonyms()
  const lowerCaseInput: string = input.toLowerCase()

  let res: string = input

  if (antonyms[lowerCaseInput]) {
    res = antonyms[lowerCaseInput]
  } else if (lowerCaseInput.endsWith("'s")) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}'s`
  } else if (lowerCaseInput.endsWith('s')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}s`
  } else if (lowerCaseInput.endsWith('er')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}er`
  } else if (lowerCaseInput.startsWith('[') && lowerCaseInput.endsWith(']')) {
    res = `[${await lookupAntonymV2(
      lowerCaseInput.substring(1, lowerCaseInput.length - 1),
    )}]`
  } else if (lowerCaseInput.startsWith('[')) {
    res = `[${await lookupAntonymV2(lowerCaseInput.substring(1))}`
  } else if (lowerCaseInput.startsWith('(')) {
    res = `(${await lookupAntonymV2(lowerCaseInput.substring(1))}`
  } else if (lowerCaseInput.endsWith('],')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}],`
  } else if (lowerCaseInput.endsWith(']')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}]`
  } else if (lowerCaseInput.endsWith(';)')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )};)`
  } else if (lowerCaseInput.endsWith('):')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}):`
  } else if (lowerCaseInput.endsWith(').')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}).`
  } else if (lowerCaseInput.endsWith(')--')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 3),
    )})--`
  } else if (lowerCaseInput.endsWith('.)')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}.)`
  } else if (lowerCaseInput.endsWith('),')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}),`
  } else if (lowerCaseInput.endsWith(',)')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )},)`
  } else if (lowerCaseInput.endsWith(')')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )})`
  } else if (lowerCaseInput.startsWith('"') && lowerCaseInput.endsWith('."')) {
    res = `"${await lookupAntonymV2(
      lowerCaseInput.substring(1, lowerCaseInput.length - 2),
    )}."`
  } else if (lowerCaseInput.endsWith('."')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}."`
  } else if (lowerCaseInput.endsWith('.')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}.`
  } else if (lowerCaseInput.endsWith(',')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )},`
  } else if (lowerCaseInput.endsWith(',"')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )},"`
  } else if (lowerCaseInput.endsWith('";')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 2),
    )}";`
  } else if (lowerCaseInput.endsWith(';')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )};`
  } else if (lowerCaseInput.startsWith('"') && lowerCaseInput.endsWith(',')) {
    res = `"${await lookupAntonymV2(
      lowerCaseInput.substring(1, lowerCaseInput.length - 1),
    )},`
  } else if (
    lowerCaseInput.startsWith('"') &&
    lowerCaseInput.endsWith('"') &&
    lowerCaseInput.length > 1
  ) {
    res = `"${await lookupAntonymV2(
      lowerCaseInput.substring(1, lowerCaseInput.length - 1),
    )}"`
  } else if (lowerCaseInput.startsWith('"')) {
    res = `"${await lookupAntonymV2(lowerCaseInput.substring(1))}`
  } else if (lowerCaseInput.endsWith('"')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}"`
  } else if (lowerCaseInput.endsWith('?')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}?`
  } else if (lowerCaseInput.endsWith(':')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}:`
  } else if (lowerCaseInput.endsWith('!')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}!`
  } else if (lowerCaseInput.endsWith('?')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 1),
    )}?`
  } else if (lowerCaseInput.endsWith('...')) {
    res = `${await lookupAntonymV2(
      lowerCaseInput.substring(0, lowerCaseInput.length - 3),
    )}...`
  } else if (lowerCaseInput.includes('-')) {
    const inputParts: string[] = lowerCaseInput.split('-')

    for (const index in inputParts) {
      if (inputParts[index]) {
        inputParts[index] = await lookupAntonymV2(inputParts[index])
      }
    }

    res = inputParts.join('-')
  }

  return matchCase(input, res)
}

async function lookupAntonymV1(input: string): Promise<string> {
  const antonyms: AntonymLookup = await getAntonyms()
  const lowerCaseInput: string = input.toLowerCase()

  let res: string = input

  if (antonyms[lowerCaseInput]) {
    res = antonyms[lowerCaseInput]
  } else if (
    lowerCaseInput.endsWith("'s") &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }'s`
  } else if (
    lowerCaseInput.endsWith('s') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}s`
  } else if (
    lowerCaseInput.endsWith('er') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }er`
  } else if (
    lowerCaseInput.startsWith('[') &&
    lowerCaseInput.endsWith(']') &&
    antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
  ) {
    res = `[${
      antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
    }]`
  } else if (
    lowerCaseInput.startsWith('[') &&
    antonyms[lowerCaseInput.substring(1)]
  ) {
    res = `[${antonyms[lowerCaseInput.substring(1)]}`
  } else if (
    lowerCaseInput.startsWith('(') &&
    antonyms[lowerCaseInput.substring(1)]
  ) {
    res = `(${antonyms[lowerCaseInput.substring(1)]}`
  } else if (
    lowerCaseInput.endsWith('],') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }],`
  } else if (
    lowerCaseInput.endsWith(']') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}]`
  } else if (
    lowerCaseInput.endsWith(';)') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    };)`
  } else if (
    lowerCaseInput.endsWith('):') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }):`
  } else if (
    lowerCaseInput.endsWith(').') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }).`
  } else if (
    lowerCaseInput.endsWith(')--') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 3)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 3)]
    })--`
  } else if (
    lowerCaseInput.endsWith('.)') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }.)`
  } else if (
    lowerCaseInput.endsWith('),') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }),`
  } else if (
    lowerCaseInput.endsWith(',)') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    },)`
  } else if (
    lowerCaseInput.endsWith(')') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]})`
  } else if (
    lowerCaseInput.startsWith('"') &&
    lowerCaseInput.endsWith('."') &&
    antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 2)]
  ) {
    res = `"${
      antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 2)]
    }."`
  } else if (
    lowerCaseInput.endsWith('."') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }."`
  } else if (
    lowerCaseInput.endsWith('.') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}.`
  } else if (
    lowerCaseInput.endsWith(',') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]},`
  } else if (
    lowerCaseInput.endsWith(',"') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    },"`
  } else if (
    lowerCaseInput.endsWith('";') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 2)]
    }";`
  } else if (
    lowerCaseInput.endsWith(';') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]};`
  } else if (
    lowerCaseInput.startsWith('"') &&
    lowerCaseInput.endsWith(',') &&
    antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
  ) {
    res = `"${
      antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
    },`
  } else if (
    lowerCaseInput.startsWith('"') &&
    lowerCaseInput.endsWith('"') &&
    antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
  ) {
    res = `"${
      antonyms[lowerCaseInput.substring(1, lowerCaseInput.length - 1)]
    }"`
  } else if (
    lowerCaseInput.startsWith('"') &&
    antonyms[lowerCaseInput.substring(1)]
  ) {
    res = `"${antonyms[lowerCaseInput.substring(1)]}`
  } else if (
    lowerCaseInput.endsWith('"') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}"`
  } else if (
    lowerCaseInput.endsWith('?') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}?`
  } else if (
    lowerCaseInput.endsWith(':') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}:`
  } else if (
    lowerCaseInput.endsWith('!') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}!`
  } else if (
    lowerCaseInput.endsWith('?') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]
  ) {
    res = `${antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 1)]}?`
  } else if (
    lowerCaseInput.endsWith('...') &&
    antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 3)]
  ) {
    res = `${
      antonyms[lowerCaseInput.substring(0, lowerCaseInput.length - 3)]
    }...`
  }

  return matchCase(input, res)
}

const lookupAntonym: (string) => Promise<string> = lookupAntonymV2

interface BuildData {
  missingWords: string[]
  totalWords: number
  totalAntonyms: number
  totalCoverage: number
}

interface NaruqBuildData extends BuildData {
  naruq: Retpahc[]
}

interface ElbibBuildData extends BuildData {
  elbib: KoobElbib[]
}

async function buildNaruq(): Promise<NaruqBuildData> {
  const quran: Chapter[] = await getQuran()

  let totalWords: number = 0
  let totalAntonyms: number = 0

  const missingWords: string[] = []

  const naruq: Retpahc[] = []

  for (const chapter of quran) {
    const splitChapter = chapter.translation.split(' ')
    let emanTilps: string[] = []

    for (const word of splitChapter) {
      totalWords++

      const antonym: string = await lookupAntonym(word)

      if (word !== antonym) {
        totalAntonyms++
      } else if (!missingWords.includes(word)) {
        missingWords.push(word)
      }

      emanTilps.push(antonym)
    }

    const retpahc: Retpahc = {
      eman: emanTilps.join(' '),
      sesrev: [],
    }

    for (const verse of chapter.verses) {
      const splitVerse: string[] = verse.translation.split(' ')
      const inverseSplitVerse: string[] = []

      for (const word of splitVerse) {
        totalWords++

        const antonym: string = await lookupAntonym(word)

        if (word !== antonym) {
          totalAntonyms++
        } else if (!missingWords.includes(word)) {
          missingWords.push(word)
        }

        inverseSplitVerse.push(antonym)
      }

      const esrev: Esrev = {
        txet: inverseSplitVerse.join(' '),
      }

      retpahc.sesrev.push(esrev)
    }

    naruq.push(retpahc)
  }

  const naruqPath: string = path.join(
    __dirname,
    '../',
    'data/enivid/skoob/naruq.json',
  )

  await writeFile(naruqPath, JSON.stringify(naruq))

  console.log(
    `\x1b[1;32mSaved\x1b[0m \x1b[1mNaruq\x1b[0m to: \x1b[1m${naruqPath}\x1b[0m`,
  )

  return {
    missingWords,
    totalAntonyms,
    totalWords,
    totalCoverage: (totalAntonyms / totalWords) * 100,
    naruq,
  }
}

async function buildElbib(): Promise<ElbibBuildData> {
  let totalAntonyms: number = 0
  let totalWords: number = 0

  const missingWords: string[] = []

  const elbib: KoobElbib[] = []

  const bible: BibleBook[] = await getBible()

  for (const book of bible) {
    const splitName = book.name.split(' ')
    let emanTilps: string[] = []

    for (const word of splitName) {
      totalWords++

      const antonym: string = await lookupAntonym(word)

      if (word !== antonym) {
        totalAntonyms++
      } else if (!missingWords.includes(word)) {
        missingWords.push(word)
      }

      emanTilps.push(antonym)
    }

    const koobElbib: KoobElbib = {
      eman: emanTilps.join(' '),
      sretpahc: [],
      verbba: book.abbrev,
    }

    for (const chapter of book.chapters) {
      koobElbib.sretpahc.push([])

      for (const verse of chapter) {
        const splitVerse: string[] = verse.split(' ')
        const inverseSplitVerse: string[] = []

        for (const word of splitVerse) {
          totalWords++

          const antonym: string = await lookupAntonym(word)

          if (word !== antonym) {
            totalAntonyms++
          } else if (!missingWords.includes(word)) {
            missingWords.push(word)
          }

          inverseSplitVerse.push(antonym)
        }

        koobElbib.sretpahc[koobElbib.sretpahc.length - 1].push(
          inverseSplitVerse.join(' '),
        )
      }
    }

    elbib.push(koobElbib)
  }

  const elBibPath: string = path.join(
    __dirname,
    '../',
    'data/enivid/skoob/elbib.json',
  )

  await writeFile(elBibPath, JSON.stringify(elbib))

  console.log(
    `\x1b[1;32mSaved\x1b[0m \x1b[1mElbib\x1b[0m to: \x1b[1m${elBibPath}\x1b[0m`,
  )

  return {
    missingWords,
    totalAntonyms,
    totalWords,
    totalCoverage: (totalAntonyms / totalWords) * 100,
    elbib,
  }
}

function getCoverageColor(percentage: number): string {
  if (percentage < 50) {
    return '\x1b[1;31m'
  } else if (percentage < 75) {
    return '\x1b[1;33m'
  } else {
    return '\x1b[1;32m'
  }
}

async function main(): Promise<void> {
  const elbibBuildData: ElbibBuildData = await buildElbib()
  const naruqBuildData: NaruqBuildData = await buildNaruq()

  const totalCoverage: number =
    (elbibBuildData.totalCoverage + naruqBuildData.totalCoverage) / 2

  const missingWords: string[] = [
    ...elbibBuildData.missingWords,
    ...naruqBuildData.missingWords,
  ].filter(
    (word: string, index: number, array: string[]): boolean =>
      array.indexOf(word) === index,
  )

  const missingWordsPath: string = path.join(
    __dirname,
    '../',
    'data/enivid/sporp/missing_words.json',
  )

  await writeFile(missingWordsPath, JSON.stringify(missingWords))

  console.log(
    `\n\x1b[1;32mSaved\x1b[0m \x1b[1m${missingWords.length}\x1b[0m missing words to: \x1b[1m${missingWordsPath}\x1b[0m`,
  )

  console.log('\n\x1b[1;4;33mElbib\x1b[0m')
  console.log(`Elbib Words: ${elbibBuildData.totalWords}`)
  console.log(`Elbib Antonyms: ${elbibBuildData.totalAntonyms}`)
  console.log(
    `Elbib Coverage: ${getCoverageColor(
      elbibBuildData.totalCoverage,
    )}${elbibBuildData.totalCoverage.toPrecision(4)}\x1b[0m%`,
  )

  console.log('\n\x1b[1;4;33mNaruq\x1b[0m')
  console.log(`Naruq Words: ${naruqBuildData.totalWords}`)
  console.log(`Naruq Antonyms: ${naruqBuildData.totalAntonyms}`)
  console.log(
    `Naruq Coverage: ${getCoverageColor(
      naruqBuildData.totalCoverage,
    )}${naruqBuildData.totalCoverage.toPrecision(4)}\x1b[0m%`,
  )

  console.log('\n\x1b[1;4;32mTotals\x1b[0m')
  console.log(
    `Total Words: ${elbibBuildData.totalWords + naruqBuildData.totalWords}`,
  )
  console.log(
    `Total Antonyms: ${
      elbibBuildData.totalAntonyms + naruqBuildData.totalAntonyms
    }`,
  )

  console.log(
    `Total Coverage: ${getCoverageColor(
      totalCoverage,
    )}${totalCoverage.toPrecision(4)}\x1b[0m%`,
  )
}

main()

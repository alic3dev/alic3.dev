import 'server-only'

import fs from 'fs'

export async function readFile(
  filePath: fs.PathOrFileDescriptor,
): Promise<any> {
  const dataBuffer: Buffer = await new Promise<Buffer>(
    (resolve: (data: Buffer) => void): void =>
      fs.readFile(
        filePath,
        (err: NodeJS.ErrnoException | null, data: Buffer): void => {
          if (err) throw err

          resolve(data)
        },
      ),
  )

  return JSON.parse(dataBuffer.toString('utf-8'))
}

export async function writeFile(
  filePath: fs.PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
): Promise<void> {
  await new Promise<void>((resolve: () => void): void =>
    fs.writeFile(filePath, data, (err: NodeJS.ErrnoException | null): void => {
      if (err) throw err

      resolve()
    }),
  )
}

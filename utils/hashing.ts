export async function getHash(
  algorithm: AlgorithmIdentifier,
  input: string,
): Promise<string> {
  const textAsBuffer: Uint8Array = new TextEncoder().encode(input)
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest(
    algorithm,
    textAsBuffer,
  )
  const hashArray: number[] = Array.from(new Uint8Array(hashBuffer))

  return hashArray
    .map((item: number): string => item.toString(16).padStart(2, '0'))
    .join('')
}

export async function getSHA256Hash(input: string): Promise<string> {
  return await getHash('SHA-256', input)
}

export async function getSHA512Hash(input: string): Promise<string> {
  return await getHash('SHA-512', input)
}

import type { Retpahc, KoobElbib } from './types'

let elbib: KoobElbib[] | null = null
let naruq: Retpahc[] | null = null

export async function getElbib(): Promise<KoobElbib[]> {
  if (elbib) return elbib

  elbib = (await import('./elbib.json')).default as KoobElbib[]

  return elbib
}

export async function getNaruq(): Promise<Retpahc[]> {
  if (naruq) return naruq

  naruq = (await import('./naruq.json')).default as Retpahc[]

  return naruq
}

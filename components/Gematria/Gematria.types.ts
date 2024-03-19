import { DecodeOptions } from '@/utils/gematria'

export interface GematriaResult {
  decodedText: string
  decodedValues: number[]
  decodedSum: number
}

export interface GematriaState extends DecodeOptions, GematriaResult {
  encodedText: string
  offline: boolean
  loading: boolean
  pastResults: GematriaResult[]
}

export interface GematriaActionResult {
  type: 'result'
  value: GematriaResult
}

export interface GematriaActionDecode {
  type: 'decode'
}

export interface GematriaActionSet {
  type: 'set'
  value: Partial<GematriaState>
}

export interface GematriaActionSetDecode
  extends Omit<GematriaActionSet, 'type'> {
  type: 'set/decode'
}

export type GematriaAction =
  | GematriaActionResult
  | GematriaActionDecode
  | GematriaActionSet
  | GematriaActionSetDecode

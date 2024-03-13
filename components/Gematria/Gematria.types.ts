import { DecodeOptions } from '@/utils/gematria'

export interface GematriaResult {
  decodedText: string
  decodedValues: number[]
  decodedSum: number
}

export interface GematriaState extends DecodeOptions, GematriaResult {
  encodedText: string
  offline: boolean
  pastResults: GematriaResult[]
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
  | GematriaActionDecode
  | GematriaActionSet
  | GematriaActionSetDecode

import { localStorageKeys } from '@/components/Gematria/GematriaStorage'

import { decode, defaultDecodeOptions } from '@/utils/gematria'

import type {
  GematriaState,
  GematriaAction,
  GematriaResult,
} from '@/components/Gematria/Gematria.types'

export const defaultGematriaState: GematriaState = {
  ...defaultDecodeOptions,
  encodedText: '',
  decodedText: '',
  decodedValues: [],
  decodedSum: 0,
  offline: false,
  loading: false,
  pastResults: [],
}

export function defaultGematriaStateInitializer(
  defaultState: GematriaState,
): GematriaState {
  if (typeof window === 'undefined') return defaultState

  const localStorageOfflineValue: string | null = window.localStorage.getItem(
    localStorageKeys.offline,
  )
  let localStorageOfflineParsedValue: boolean | null = null

  try {
    if (localStorageOfflineValue) {
      const localStorageOfflineJSONValue: any = JSON.parse(
        localStorageOfflineValue,
      )

      if (typeof localStorageOfflineJSONValue === 'boolean') {
        localStorageOfflineParsedValue = localStorageOfflineJSONValue
      } else {
        window.localStorage.removeItem(localStorageKeys.offline)
      }
    }
  } catch {}

  return {
    ...defaultState,
    offline: localStorageOfflineParsedValue ?? defaultState.offline,
  }
}

export const gematriaStateReducer: React.Reducer<
  GematriaState,
  GematriaAction
> = (prevState: GematriaState, action: GematriaAction): GematriaState => {
  const actionTypes: GematriaAction['type'][] = action.type.split(
    '/',
  ) as GematriaAction['type'][]

  if (actionTypes.length > 1) {
    let res: GematriaState = { ...prevState }

    for (const type of actionTypes) {
      res = {
        ...res,
        ...gematriaStateReducer(res, { ...action, type } as GematriaAction),
      }
    }

    return res
  }

  switch (action.type) {
    case 'result':
      return {
        ...prevState,
        ...action.value,
        pastResults: [action.value, ...prevState.pastResults],
      }
    case 'decode':
      const decodedValues: number[] = decode(prevState.encodedText, {
        ignoreCase: prevState.ignoreCase,
        ignoreCaseDirection: prevState.ignoreCaseDirection,
        ignoreSpaces: prevState.ignoreSpaces,
        method: prevState.method,
      })

      const result: GematriaResult = {
        decodedText: prevState.encodedText,
        decodedValues,
        decodedSum: decodedValues.reduce(
          (a: number, c: number): number => a + c,
          0,
        ),
      }

      return gematriaStateReducer(prevState, {
        type: 'result',
        value: result,
      })
    case 'set':
      if (
        action.value.hasOwnProperty('offline') &&
        prevState.offline !== action.value.offline
      ) {
        window.localStorage.setItem(
          localStorageKeys.offline,
          JSON.stringify(action.value.offline),
        )
      }

      return { ...prevState, ...action.value }
    default:
      throw new Error('Unknown gematria state reducer action type')
  }
}

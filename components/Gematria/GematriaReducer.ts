import { localStorageKeys } from '@/components/Gematria/GematriaStorage'

import { decode } from '@/utils/gematria'

import type {
  GematriaState,
  GematriaAction,
  GematriaResult,
} from '@/components/Gematria/Gematria.types'

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
    case 'decode':
      if (
        prevState.pastResults.length &&
        prevState.pastResults[0].decodedText === prevState.encodedText
      ) {
        return prevState
      }

      if (prevState.offline) {
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

        return {
          ...prevState,
          ...result,
          pastResults: [result, ...prevState.pastResults],
        }
      }

      fetch('/api/gematria', {
        method: 'POST',
      })

      return {
        ...prevState,
        decodedText: prevState.encodedText,
      }
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

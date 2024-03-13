'use client'
import React from 'react'

import * as gematria from '@/utils/gematria'

import styles from './Gematria.module.scss'

import type {
  GematriaState,
  GematriaAction,
  GematriaResult,
} from '@/components/Gematria/Gematria.types'

const GEMATRIA_LOCAL_STORAGE_PREFIX: string = 'gematria:'
const localStorageKeys: Record<string, string> = {
  offline: `${GEMATRIA_LOCAL_STORAGE_PREFIX}offline`,
}

const gematriaStateReducer: React.Reducer<GematriaState, GematriaAction> = (
  prevState: GematriaState,
  action: GematriaAction,
): GematriaState => {
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
        const decodedValues: number[] = gematria.decode(prevState.encodedText, {
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

export function Gematria(): JSX.Element {
  const [state, dispatch] = React.useReducer<
    React.Reducer<GematriaState, GematriaAction>,
    GematriaState
  >(
    gematriaStateReducer,
    {
      ...gematria.defaultDecodeOptions,
      encodedText: '',
      decodedText: '',
      decodedValues: [],
      decodedSum: 0,
      offline: false,
      pastResults: [],
    },
    (defaultState: GematriaState): GematriaState => {
      if (typeof window === 'undefined') return defaultState

      const localStorageOfflineValue: string | null =
        window.localStorage.getItem(localStorageKeys.offline)
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
        offline: true, //localStorageOfflineParsedValue ?? defaultState.offline,
      }
    },
  )

  return (
    <div className={styles.gematria}>
      <div className={styles.section}>
        <div className={styles.decoding}>
          {state.decodedValues && state.decodedValues.length > 0 && (
            <>
              <h3 className={styles['decoded-text']}>{state.decodedText}</h3>
              <h2 className={styles['decoded-sum']}>{state.decodedSum}</h2>
              <p className={styles['decoded-parts']}>
                {state.decodedText.split('').map((c, i) => (
                  <span className={styles['decoded-part']} key={c + i}>
                    {c} - {state.decodedValues[i]}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>

        <label>
          <input
            type="text"
            placeholder="Enter text to decode..."
            value={state.encodedText}
            onChange={(event) =>
              dispatch({
                type: 'set',
                value: { encodedText: event.target.value },
              })
            }
          />
        </label>

        <button onClick={() => dispatch({ type: 'decode' })}>Decode</button>

        <div className={styles.options}>
          <label>
            Ignore Case{' '}
            <input
              type="checkbox"
              checked={state.ignoreCase}
              onChange={(event) =>
                dispatch({
                  type: 'set',
                  value: { ignoreCase: event.target.checked },
                })
              }
            />
          </label>

          {state.ignoreCase && (
            <label>
              Ignore Case Direction{' '}
              <select
                value={state.ignoreCaseDirection}
                onChange={(event) =>
                  dispatch({
                    type: 'set',
                    value: {
                      ignoreCaseDirection: event.target
                        .value as gematria.IgnoreCaseDirection,
                    },
                  })
                }
              >
                {gematria.ignoreCaseDirections.map(
                  (
                    ignoreCaseDirectionPossibility: gematria.IgnoreCaseDirection,
                  ) => (
                    <option
                      key={ignoreCaseDirectionPossibility}
                      value={ignoreCaseDirectionPossibility}
                    >
                      {ignoreCaseDirectionPossibility}
                    </option>
                  ),
                )}
              </select>
            </label>
          )}

          <label>
            Ignore Spaces{' '}
            <input
              type="checkbox"
              checked={state.ignoreSpaces}
              onChange={(event) =>
                dispatch({
                  type: 'set',
                  value: { ignoreSpaces: event.target.checked },
                })
              }
            />
          </label>

          {/* <label>
          Offline{' '}
          <span title="Results will be stored/retrieved on/from the server if left unchecked">
            (?)
          </span>
          <input
            type="checkbox"
            checked={state.offline}
            onChange={(event) =>
              dispatch({
                type: 'set',
                value: { offline: event.target.checked },
              })
            }
          />
        </label> */}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Results</h3>

        {state.pastResults.length - 1 > 0 && (
          <div>
            {state.pastResults.map(
              (result: GematriaResult, index: number): React.ReactNode => (
                <React.Fragment
                  key={result.decodedText + (state.pastResults.length - index)}
                >
                  {!!index && (
                    <div
                      onClick={(): void =>
                        dispatch({
                          type: 'set/decode',
                          value: { encodedText: result.decodedText },
                        })
                      }
                    >
                      {result.decodedText}:{' '}
                      {JSON.stringify(result.decodedValues)} :{' '}
                      {result.decodedSum}
                    </div>
                  )}
                </React.Fragment>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}

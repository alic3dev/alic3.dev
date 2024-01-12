'use client'
import React from 'react'

import * as gematria from '@/utils/gematria'

import styles from './Gematria.module.scss'

const GEMATRIA_LOCAL_STORAGE_PREFIX: string = 'gematria:'
const localStorageKeys: Record<string, string> = {
  offline: `${GEMATRIA_LOCAL_STORAGE_PREFIX}offline`,
}

interface GematriaState extends gematria.DecodeOptions {
  encodedText: string
  decodedText: string
  decodedValues: number[]
  decodedSum: number
  offline: boolean
}
interface GematriaActionDecode {
  type: 'decode'
}

interface GematriaActionSet {
  type: 'set'
  value: Partial<GematriaState>
}

type GematriaAction = GematriaActionDecode | GematriaActionSet

const gematriaStateReducer: React.Reducer<GematriaState, GematriaAction> = (
  prevState: GematriaState,
  action: GematriaAction,
): GematriaState => {
  switch (action.type) {
    case 'decode':
      if (prevState.offline) {
        const decodedValues = gematria.decode(prevState.encodedText, {
          ignoreCase: prevState.ignoreCase,
          ignoreCaseDirection: prevState.ignoreCaseDirection,
          ignoreSpaces: prevState.ignoreSpaces,
          method: prevState.method,
        })

        return {
          ...prevState,
          decodedText: prevState.encodedText,
          decodedValues,
          decodedSum: decodedValues.reduce(
            (a: number, c: number): number => a + c,
            0,
          ),
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
  const [state, dispatch] = React.useReducer(
    gematriaStateReducer,
    {
      ...gematria.defaultDecodeOptions,
      encodedText: '',
      decodedText: '',
      decodedValues: [],
      decodedSum: 0,
      offline: false,
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
        offline: localStorageOfflineParsedValue ?? defaultState.offline,
      }
    },
  )

  return (
    <div className={styles.gematria}>
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

        <label>
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
        </label>
      </div>
    </div>
  )
}
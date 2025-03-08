'use client'

import type {
  GematriaState,
  GematriaAction,
  GematriaResult,
} from '@/components/Gematria/Gematria.types'

import React from 'react'

import {
  gematriaStateReducer,
  defaultGematriaState,
  defaultGematriaStateInitializer,
} from '@/components/Gematria/GematriaReducer'

import * as gematria from '@/utils/gematria'

import styles from '@/components/Gematria/Gematria.module.scss'

export function Gematria(): React.ReactElement {
  const [state, dispatch] = React.useReducer<
    GematriaState,
    GematriaState,
    [action: GematriaAction]
  >(gematriaStateReducer, defaultGematriaState, defaultGematriaStateInitializer)

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        event.stopPropagation()

        if (
          state.pastResults.length &&
          state.pastResults[0].decodedText === state.encodedText
        ) {
          return
        }

        if (state.offline) {
          dispatch({ type: 'decode' })
        } else {
          const body: FormData = new FormData(event.currentTarget)

          const res: Response = await fetch('/api/gematria', {
            method: 'POST',
            body,
          })

          const data: Api.Gematria.ResponseData = await res.json()

          if (data.success) {
            dispatch({
              type: 'result',
              value: {
                decodedText: body.get('encoded-text') as string,
                decodedSum: data.decoded.sum,
                decodedValues: data.decoded.values,
              },
            })
          }
        }
      },
      [state],
    )

  return (
    <div className={styles.gematria}>
      <form className={styles.section} onSubmit={onFormSubmit}>
        <div className={styles.decoding}>
          {state.decodedValues && state.decodedValues.length > 0 && (
            <>
              <h3 className={styles['decoded-text']}>{state.decodedText}</h3>
              <h2 className={styles['decoded-sum']}>{state.decodedSum}</h2>
              <p className={styles['decoded-parts']}>
                {state.decodedText.split('').map(
                  (character: string, index: number): React.ReactNode => (
                    <span
                      className={styles['decoded-part']}
                      key={character + index}
                    >
                      {character} - {state.decodedValues[index]}
                    </span>
                  ),
                )}
              </p>
            </>
          )}
        </div>

        <label>
          <input
            type="text"
            placeholder="Enter text to decode..."
            value={state.encodedText}
            name="encoded-text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              dispatch({
                type: 'set',
                value: { encodedText: event.target.value },
              })
            }
          />
        </label>

        <input type="submit" value="Decode" disabled={false} />

        <div className={styles.options}>
          <label>
            Ignore Case{' '}
            <input
              type="checkbox"
              checked={state.ignoreCase}
              name="ignore-case"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
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
                name="ignore-case-direction"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
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
                  ): React.ReactNode => (
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
              name="ignore-spaces"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                dispatch({
                  type: 'set',
                  value: { offline: event.target.checked },
                })
              }
            />
          </label>
        </div>
      </form>

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

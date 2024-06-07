'use client'

import React from 'react'

import styles from '@/components/CollapsibleItem.module.scss'

const minimizedDescriptionsLocalStorageKey: string =
  'alic3-dev:minimized-descriptions'

export function CollapsibleItem({
  id,
  title,
  subTitle,
  detailedTitle,
  content,
  footer,
  footerIntro,
}: {
  id?: string
  title: React.ReactNode
  subTitle?: React.ReactNode
  detailedTitle?: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
  footerIntro: React.ReactNode
}): React.ReactNode {
  const [minimized, setMinimized] = React.useState<boolean>(false)

  React.useEffect((): void => {
    if (!id) return

    const minimizedDescriptionsJSON: string | null =
      window.localStorage.getItem(minimizedDescriptionsLocalStorageKey)

    if (!minimizedDescriptionsJSON) return

    try {
      const minimizedDescriptionsJSONParsed: string[] = JSON.parse(
        minimizedDescriptionsJSON,
      )

      if (Array.isArray(minimizedDescriptionsJSONParsed)) {
        setMinimized(minimizedDescriptionsJSONParsed.includes(id))
      } else {
        window.localStorage.removeItem(minimizedDescriptionsLocalStorageKey)
      }
    } catch {}
  }, [id])

  const saveMinimizedState = React.useCallback(
    (isMinimized: boolean): void => {
      if (!id) return

      const minimizedDescriptionsJSON: string | null =
        window.localStorage.getItem(minimizedDescriptionsLocalStorageKey)

      let minimizedDescriptionsJSONParsed: string[] = []

      if (minimizedDescriptionsJSON) {
        try {
          minimizedDescriptionsJSONParsed = JSON.parse(
            minimizedDescriptionsJSON,
          )

          if (!Array.isArray(minimizedDescriptionsJSONParsed)) {
            window.localStorage.removeItem(minimizedDescriptionsLocalStorageKey)
            minimizedDescriptionsJSONParsed = []
          }
        } catch {}
      }

      if (isMinimized) {
        if (!minimizedDescriptionsJSONParsed.includes(id)) {
          minimizedDescriptionsJSONParsed.push(id)
        }
      } else {
        minimizedDescriptionsJSONParsed =
          minimizedDescriptionsJSONParsed.filter(
            (minimizedDescription: string): boolean =>
              minimizedDescription !== id,
          )
      }

      window.localStorage.setItem(
        minimizedDescriptionsLocalStorageKey,
        JSON.stringify(minimizedDescriptionsJSONParsed),
      )
    },
    [id],
  )

  return (
    <div className={styles['collapsible-item']}>
      <div
        className={`${styles['collapsible-item-info']} ${
          minimized ? styles['minimized'] : ''
        }`}
      >
        <h4 className={styles['collapsible-item-info-title']}>{title}</h4>

        {(subTitle || detailedTitle) && (
          <span className={styles['collapsible-item-info-sub-title']}>
            {subTitle}
            {detailedTitle && (
              <span className={styles['collapsible-item-info-detailed-title']}>
                {' '}
                ({detailedTitle})
              </span>
            )}
          </span>
        )}

        <div className={styles['collapsible-item-info-seperator']} />

        <button
          className={`
                  ${styles['collapsible-item-info-toggle-minimize']}
                  ${minimized ? styles['minimized'] : ''}
                `}
          onClick={(): void =>
            setMinimized((prevMinimized: boolean): boolean => {
              saveMinimizedState(!prevMinimized)

              return !prevMinimized
            })
          }
          aria-label={minimized ? 'Expand content' : 'Minimize content'}
          title={minimized ? 'Expand content' : 'Minimize content'}
        >
          {minimized ? '+' : '-'}
        </button>
      </div>

      {minimized || (
        <p className={styles['collapsible-item-content']}>{content}</p>
      )}

      {minimized ||
        (footer && (
          <div className={styles['collapsible-item-footer']}>
            <div className={styles['collapsible-item-footer-intro']}>
              {footerIntro && (
                <span className={styles['collapsible-item-footer-intro-text']}>
                  {footerIntro}
                </span>
              )}
            </div>

            {footer}
          </div>
        ))}
    </div>
  )
}

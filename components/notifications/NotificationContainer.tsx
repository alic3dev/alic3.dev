'use client'

import type {
  NotificationContextInterface,
  NotificationInterface,
} from '@/components/notifications/types'

import React from 'react'
import Link from 'next/link'

import { Notification } from '@/components/notifications/Notification'
import { NotificationContext } from '@/contexts/NotificationContext'

import styles from '@/components/notifications/NotificationContainer.module.scss'

const cookieNoticeKey: string = 'alic3-dev:agreed-to-cookie-notice'

function CookieNoticeContent({
  onGotIt,
}: {
  onGotIt?: () => void
}): JSX.Element {
  return (
    <div className={styles['cookie-notice']}>
      <div className={styles['cookie-notice-content']}>
        <h3>This site uses cookies.</h3>
        <p>
          Some of them are essential while others are used to serve you a
          customized experience.
        </p>
        <p>
          <Link href="/cookies">Learn more</Link>
        </p>
      </div>
      <button
        className={styles['cookie-notice-content-button']}
        onClick={onGotIt ?? ((): void => {})}
      >
        Got it
      </button>
    </div>
  )
}

export function NotificationContainer(): JSX.Element {
  const notificationContext =
    React.useContext<NotificationContextInterface>(NotificationContext)

  const cookieNoticeRef = React.useRef<{
    addedNotice: boolean
    agreedToCookieNotice: boolean
  }>({
    addedNotice: false,
    agreedToCookieNotice: false,
  })

  React.useEffect((): void => {
    if (
      cookieNoticeRef.current.addedNotice ||
      cookieNoticeRef.current.agreedToCookieNotice
    ) {
      return
    }

    const cookieNoticeStored: string | null =
      window.localStorage.getItem(cookieNoticeKey)

    if (cookieNoticeStored) {
      try {
        const parsedCookieNoticeStored: any = JSON.parse(cookieNoticeStored)

        if (typeof parsedCookieNoticeStored === 'boolean') {
          cookieNoticeRef.current.agreedToCookieNotice =
            parsedCookieNoticeStored
        } else {
          window.localStorage.removeItem(cookieNoticeKey)
        }
      } catch {
        window.localStorage.removeItem(cookieNoticeKey)
      }
    }

    if (!cookieNoticeRef.current.agreedToCookieNotice) {
      const cookieNoticeNotificationID: string | undefined =
        notificationContext.notificationManager.add({
          icon: 'cookie',
          length: 'permanent',
          content: (
            <CookieNoticeContent
              onGotIt={(): void => {
                if (cookieNoticeNotificationID) {
                  notificationContext.notificationManager.remove(
                    cookieNoticeNotificationID,
                  )
                }

                cookieNoticeRef.current.agreedToCookieNotice = true

                window.localStorage.setItem(
                  cookieNoticeKey,
                  JSON.stringify(true),
                )
              }}
            />
          ),
        })
    }

    cookieNoticeRef.current.addedNotice = true
  }, [notificationContext.notificationManager])

  return (
    <div className={styles['notification-container']}>
      {notificationContext.notifications.map(
        (notification: NotificationInterface): JSX.Element => (
          <Notification
            key={notification.id ?? crypto.randomUUID()}
            {...notification}
          />
        ),
      )}
    </div>
  )
}

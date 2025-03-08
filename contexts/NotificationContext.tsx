'use client'

import type {
  NotificationInterface,
  NotificationContextInterface,
  NotificationManagerInterface,
} from '@/components/notifications/types'

import React from 'react'

class NotificationManager implements NotificationManagerInterface {
  #setNotifications?: React.Dispatch<
    React.SetStateAction<NotificationInterface[]>
  >

  constructor({
    setNotifications,
  }: {
    setNotifications?: React.Dispatch<
      React.SetStateAction<NotificationInterface[]>
    >
  }) {
    this.#setNotifications = setNotifications
  }

  add(notification: NotificationInterface): string | undefined {
    if (!this.#setNotifications) return

    const id: string = notification.id ?? crypto.randomUUID()

    this.#setNotifications(
      (prevNotifications: NotificationInterface[]): NotificationInterface[] => [
        ...prevNotifications,
        {
          id,
          ...notification,
        },
      ],
    )

    return id
  }

  remove(id: string): void {
    if (!this.#setNotifications) return

    this.#setNotifications(
      (prevNotifications: NotificationInterface[]): NotificationInterface[] =>
        prevNotifications.filter(
          (notification: NotificationInterface): boolean =>
            notification.id !== id,
        ),
    )
  }

  removeAll(): void {
    if (!this.#setNotifications) return

    this.#setNotifications([])
  }
}

export const NotificationContext =
  React.createContext<NotificationContextInterface>({
    notifications: [],
    notificationManager: new NotificationManager({}),
  })

export function NotificationContextWrapper({
  children,
}: React.PropsWithChildren): React.ReactElement {
  const [notifications, setNotifications] = React.useState<
    NotificationInterface[]
  >([])

  const [notificationManager] = React.useState<NotificationManager>(
    new NotificationManager({ setNotifications }),
  )

  const notificationContextValue = React.useMemo<NotificationContextInterface>(
    (): NotificationContextInterface => ({
      notifications,
      notificationManager,
    }),
    [notifications, notificationManager],
  )

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

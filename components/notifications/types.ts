export type NotificationLength = 'short' | 'medium' | 'long' | 'permanent'
export type NotificationIcon = 'cookie' | 'alert'

export interface NotificationInterface {
  id?: string
  icon?: NotificationIcon
  length: NotificationLength
  content: React.ReactNode
}

export interface NotificationManagerInterface {
  add(notification: NotificationInterface): string | undefined
  remove(id: string): void
  removeAll(): void
}

export interface NotificationContextInterface {
  notifications: NotificationInterface[]
  notificationManager: NotificationManagerInterface
}

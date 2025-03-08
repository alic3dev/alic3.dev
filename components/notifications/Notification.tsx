import type {
  NotificationContextInterface,
  NotificationInterface,
  NotificationLength,
} from '@/components/notifications/types'

import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { IoAlertCircleSharp } from 'react-icons/io5'
import { PiCookie } from 'react-icons/pi'

import { NotificationContext } from '@/contexts/NotificationContext'

import styles from '@/components/notifications/Notification.module.scss'

const lengthMSLookup: Record<NotificationLength, number> = {
  short: 2000,
  medium: 5000,
  long: 10000,
  permanent: Infinity,
}

export function Notification({
  id,
  icon,
  length,
  content,
}: NotificationInterface): React.ReactElement {
  const [closing, setClosing] = React.useState<boolean>(false)
  const elapsedTimeMS = React.useRef<number>(0)

  const iconNode = React.useMemo<React.ReactNode>((): React.ReactNode => {
    if (icon === 'alert') {
      return <IoAlertCircleSharp />
    } else if (icon === 'cookie') {
      return <PiCookie />
    } else {
      return <></>
    }
  }, [icon])

  const notificationContext =
    React.useContext<NotificationContextInterface>(NotificationContext)

  const close = React.useCallback((): void => {
    if (!id || closing) return

    setClosing(true)

    setTimeout((): void => {
      notificationContext.notificationManager.remove(id)
    }, 1000)
  }, [id, closing, notificationContext.notificationManager])

  React.useEffect((): void | (() => void) => {
    if (length === 'permanent') return

    const timeout: NodeJS.Timeout = setTimeout((): void => {
      close()
    }, lengthMSLookup[length] - elapsedTimeMS.current)

    const currentTime: number = Date.now()

    return (): void => {
      clearTimeout(timeout)

      elapsedTimeMS.current = elapsedTimeMS.current + (Date.now() - currentTime)
    }
  }, [length, close])

  return (
    <div className={`${styles.notification} ${closing ? styles.closing : ''}`}>
      <div className={styles.icon}>{iconNode}</div>

      <div>{content}</div>

      {id && (
        <button className={styles.close} onClick={close}>
          <IoIosClose />
        </button>
      )}
    </div>
  )
}

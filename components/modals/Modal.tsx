import type {
  ModalContextInterface,
  ModalInterface,
} from '@/components/modals/types'

import React from 'react'
import { IoIosClose } from 'react-icons/io'

import { ModalContext } from '@/components/modals/ModalContext'

import styles from '@/components/modals/Modal.module.scss'

export function Modal({ id, content }: ModalInterface): JSX.Element {
  const [closing, setClosing] = React.useState<boolean>(false)

  const modalContext = React.useContext<ModalContextInterface>(ModalContext)

  const close = React.useCallback((): void => {
    if (!id || closing) return

    setClosing(true)

    setTimeout((): void => {
      modalContext.modalManager.remove(id)
    }, 250)
  }, [id, closing, modalContext.modalManager])

  return (
    <div className={`${styles.modal} ${closing ? styles.closing : ''}`}>
      <div className={styles.header}>
        {id && (
          <button className={styles.close} onClick={close}>
            <IoIosClose />
          </button>
        )}
      </div>

      <div className={styles.content}>{content}</div>
    </div>
  )
}

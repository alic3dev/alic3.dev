'use client'

import type { ModalContextInterface, ModalInterface } from './types'

import React from 'react'

import styles from './ModalContainer.module.scss'

import { Modal } from './Modal'
import { ModalContext } from './ModalContext'

import { NoPageScroll } from '@/utils/useNoPageScroll'

export function ModalContainer(): JSX.Element {
  const modalContext = React.useContext<ModalContextInterface>(ModalContext)

  const closeTop = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      if (event.target !== event.currentTarget) return

      const topModal: ModalInterface =
        modalContext.modals[modalContext.modals.length - 1]

      if (topModal && topModal.id) {
        modalContext.modalManager.remove(topModal.id)
      }
    },
    [modalContext],
  )

  React.useEffect(() => {})

  return (
    <div
      className={`${styles['modal-container']} ${
        modalContext.modals.length ? styles['with-content'] : ''
      }`}
      onClick={closeTop}
    >
      {modalContext.modals.map(
        (modal: ModalInterface): JSX.Element => (
          <Modal key={modal.id ?? crypto.randomUUID()} {...modal} />
        ),
      )}

      {modalContext.modals.length ? <NoPageScroll /> : <></>}
    </div>
  )
}

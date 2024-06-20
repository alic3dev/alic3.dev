'use client'

import type {
  ModalInterface,
  ModalContextInterface,
  ModalManagerInterface,
} from '@/components/modals/types'

import React from 'react'

class ModalManager implements ModalManagerInterface {
  #setModals?: React.Dispatch<React.SetStateAction<ModalInterface[]>>

  constructor({
    setModals,
  }: {
    setModals?: React.Dispatch<React.SetStateAction<ModalInterface[]>>
  }) {
    this.#setModals = setModals
  }

  add(modal: ModalInterface): string | undefined {
    if (!this.#setModals) return

    const id: string = modal.id ?? crypto.randomUUID()

    this.#setModals((prevModals: ModalInterface[]): ModalInterface[] => [
      ...prevModals,
      {
        id,
        ...modal,
      },
    ])

    return id
  }

  remove(id: string): void {
    if (!this.#setModals) return

    this.#setModals((prevModals: ModalInterface[]): ModalInterface[] =>
      prevModals.filter((modal: ModalInterface): boolean => modal.id !== id),
    )
  }

  removeAll(): void {
    if (!this.#setModals) return

    this.#setModals([])
  }
}

export const ModalContext = React.createContext<ModalContextInterface>({
  modals: [],
  modalManager: new ModalManager({}),
})

export function ModalContextWrapper({
  children,
}: React.PropsWithChildren): JSX.Element {
  const [modals, setModals] = React.useState<ModalInterface[]>([])

  const [modalManager] = React.useState<ModalManager>(
    new ModalManager({ setModals }),
  )

  const modalContextValue = React.useMemo<ModalContextInterface>(
    (): ModalContextInterface => ({
      modals,
      modalManager,
    }),
    [modals, modalManager],
  )

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  )
}

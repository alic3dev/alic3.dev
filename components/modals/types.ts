export interface ModalInterface {
  id?: string
  content: React.ReactNode
}

export interface ModalManagerInterface {
  add(modal: ModalInterface): string | undefined
  remove(id: string): void
  removeAll(): void
}

export interface ModalContextInterface {
  modals: ModalInterface[]
  modalManager: ModalManagerInterface
}

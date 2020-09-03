import { TModalHandles } from 'components/ui/modal'

export const useModal = (modalRef: React.RefObject<TModalHandles>) => {
  const openModal = () => {
        modalRef.current!.open()
  }

  const closeModal = () => {
        modalRef.current!.close()
  }

  return { openModal, closeModal }
}

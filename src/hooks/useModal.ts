import React from 'react'

import { ModalContext } from '../theme/ui/layout/modal'

const useModal = (modal: React.ReactNode, options: any = false): any => {
  const { onDismiss, onPresent } = React.useContext(ModalContext)

  const handlePresent = React.useCallback(() => {
    onPresent(modal, options)
  }, [modal, onPresent, options])

  return [handlePresent, onDismiss]
}

export default useModal

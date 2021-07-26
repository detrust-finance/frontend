import React from 'react'
import { DrawerContext } from '../theme/ui/layout/drawer'

const useDrawer = (drawer: React.ReactNode): any => {
  const { onDismiss, onPresent } = React.useContext(DrawerContext)

  const handlePresent = React.useCallback(() => {
    onPresent(drawer)
  }, [drawer, onPresent])

  return [handlePresent, onDismiss]
}

export default useDrawer

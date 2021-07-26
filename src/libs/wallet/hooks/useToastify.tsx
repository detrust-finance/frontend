import React from 'react'
import { toast as toastify } from 'react-toastify'
import { TxNotification, ReloadNotification } from '../components'

function useToastify() {
  const txToast = React.useCallback(
    (
      message: string,
      txId: string,
      type:
        | 'success'
        | 'warning'
        | 'info'
        | 'error'
        | 'default'
        | 'dark'
        | undefined,
    ) => {
      toastify(
        ({ closeToast }) => (
          <TxNotification txId={txId} closeToast={closeToast}>
            {message}
          </TxNotification>
        ),
        {
          type,
          autoClose: false,
        },
      )
    },
    [],
  )

  const reloadToast = React.useCallback(
    (
      message: string,
      type:
        | 'success'
        | 'warning'
        | 'info'
        | 'error'
        | 'default'
        | 'dark'
        | undefined,
    ) => {
      toastify(() => <ReloadNotification>{message}</ReloadNotification>, {
        type,
        autoClose: false,
      })
    },
    [],
  )

  const toast = React.useCallback(
    (
      message: string,
      type:
        | 'success'
        | 'warning'
        | 'info'
        | 'error'
        | 'default'
        | 'dark'
        | undefined,
    ) => {
      toastify(message, {
        type,
        autoClose: false,
      })
    },
    [],
  )

  return {
    txToast,
    reloadToast,
    toast,
  }
}

export default useToastify

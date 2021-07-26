import React from 'react'
// Hooks
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
// Components
import { Flex, Box, Text } from 'rebass/styled-components'
import { Button, Spacer } from '../../../../theme/ui'
// Interfaces
import { TxNotificationProps } from './interfaces'
// Utils
import { getEtherscanLink } from '../../utils'
import { rem } from 'polished'

export const TxNotification: React.FC<TxNotificationProps> = ({
  children,
  txId,
  closeToast,
  ...restprops
}) => {
  const { t } = useTranslation('platform')
  const { chainId } = useActiveWeb3React()
  return (
    <Flex flexDirection='column' {...restprops}>
      <Box>
        <Text fontSize={14}>{children}</Text>
      </Box>
      <Spacer size='lg' />
      <Flex width='100%'>
        {txId && (
          <>
            <a
              href={getEtherscanLink(chainId || 42, txId, 'transaction')}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button
                flex={1}
                variant='white-outlined'
                size='sm'
                width={rem('142px')}
              >
                {t('view-on-etherscan')}
              </Button>
            </a>
            <Spacer size='md' />
          </>
        )}
        <Button
          flex={1}
          variant='white-outlined'
          onClick={closeToast}
          size='sm'
          width='100%'
        >
          {t('close')}
        </Button>
      </Flex>
    </Flex>
  )
}

import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Text } from 'rebass/styled-components'
import { Cancel, ChatBubbleWarning } from 'iconoir-react'
import { useTheme } from '../../hooks'
import { ModalContext } from '../../theme/ui/layout/modal'
import { ChainId, useWallet } from '../../libs/wallet'
//import { Spacer } from '../../theme/ui'
import { DETRUST_NETWORKS } from '../../libs/detrust'

const NetworkModal: React.FC = () => {
  const { t } = useTranslation('common')
  const { colors, fontWeight, fontSizes } = useTheme()
  const { onDismiss } = React.useContext(ModalContext)
  const { chainEnabled } = useWallet()

  const possibleNetworks = React.useMemo(() => {
    const possible: any = []
    Object.keys(DETRUST_NETWORKS).forEach((key: unknown) => {
      if (DETRUST_NETWORKS?.[key as ChainId])
        possible.push({
          name: t(`modal.text.network-name.${key}`),
        })
    })
    return possible
  }, [t])

  React.useEffect(() => {
    if (chainEnabled) onDismiss()
  }, [chainEnabled, onDismiss])

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      mb={40}
    >
      <Flex
        width='100%'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        mb={45}
      >
        <Text
          sx={{
            textTransform: 'uppercase',
            fontSize: '16px',
            lineHeight: '24px',
            //mb: '30px',
          }}
        >
          {t('modal.title.warning')}
        </Text>
        <Cancel
          width='14px'
          height='14px'
          onClick={onDismiss}
          cursor='pointer'
          color='black'
        />
      </Flex>
      <ChatBubbleWarning
        width={28}
        height={28}
      />
      <Box color={colors.dolphin} fontSize='17px' mt={14} mb={20}>
        {t('modal.text.change-network')}
      </Box>
      {/* <Spacer size='lg' /> */}
      {possibleNetworks.map((network: any) => (
        <Flex
          key={network.name}
          alignItems='center'
          fontWeight={fontWeight.bold}
          fontSize={fontSizes.xl}
          color='jaffa'
          mt={10}
        >
          <Box mr='8px' pt='1px'>
            <Image src='/images/icon-eth-3x.png' width={22} height={22} />
          </Box>
          {network.name}
        </Flex>
      ))}
    </Flex>
  )
}

export default NetworkModal

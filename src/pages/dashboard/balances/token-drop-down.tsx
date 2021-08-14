import React from 'react'
import { Box, Flex, Text, Image } from 'rebass/styled-components'
import { useDetrust } from '../../../libs/detrust'
import DropDown from '../../../components/dropw-down/index'
import DropdownMenuOptions from '../../../components/dropdown-menu-options/index'
import { ChevronDown } from 'react-feather'
import { Spacer } from '../../../theme/ui'
import { useTheme } from '../../../hooks'
import { IApiTrustToken } from '../../../constants'

const TokenDropDown: React.FC = () => {
  const { darkMode, colors } = useTheme()
  const { walletTrustTokens } = useDetrust()
  const [tokenState, setTokenState] = React.useState<IApiTrustToken>()

  React.useEffect(() => {
    if (!walletTrustTokens) return
    setTokenState(
      walletTrustTokens.length > 0
        ? walletTrustTokens.filter((token: IApiTrustToken) => token.enabled)[0]
        : undefined,
    )
  }, [walletTrustTokens])

  return (
    <Box variant='outlined-box' py={0}>
      <DropDown
        buttonComponent={
          <Flex width='100%' height={55} alignItems='center'>
            {tokenState && (
              <Flex justifyContent='space-between' width='100%'>
                <Flex flexDirection='row' marginLeft='20px' alignItems='center'>
                  <Image
                    className='list-icon'
                    src={tokenState?.icon?.url}
                    width={18}
                    height={18}
                  />
                  <Spacer size='xs' />
                  <Text fontWeight='600' fontSize='lg'>
                    {' '}
                    {tokenState?.symbol}
                  </Text>
                  <Spacer size='xs' />
                  <Text paddingTop='4px' fontSize='md' color={colors.grey[200]}>
                    {' '}
                    {tokenState?.name}
                  </Text>
                </Flex>

                <Box marginRight='5%'>
                  <ChevronDown
                    height='15'
                    color={darkMode ? colors.grey[800] : colors.grey[800]}
                  />
                </Box>
              </Flex>
            )}
          </Flex>
        }
        menuComponent={
          <DropdownMenuOptions
            options={
              walletTrustTokens.length > 0
                ? walletTrustTokens.filter(
                    (token: IApiTrustToken) => token.enabled,
                  )
                : []
            }
            onClick={setTokenState}
          />
        }
        menuStyle={{
          top: '55px',
          left: '-1px',
          width: ['100%', '100%', '350.5px', '350.5px'],
        }}
      />
    </Box>
  )
}

export default TokenDropDown

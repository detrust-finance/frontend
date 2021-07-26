/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import { Box } from 'rebass/styled-components'
import { ETH_ADDRESS, NUMBER_FORMAT } from '../../constants'
import { useTheme } from '../../hooks'
import { useGetBalance } from '../../libs/detrust'
import { useETHBalances } from '../../libs/multicall'
import { useActiveWeb3React } from '../../libs/wallet'
import { BalanceProps } from './interfaces'

const Balance: React.FC<BalanceProps> = ({ address, type, ...restprops }) => {
  const { account } = useActiveWeb3React()
  const { colors } = useTheme()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ''
  ]

  const { data: contractBalance } = useGetBalance()

  return (
    <Box as='span' color={colors.grey[200]} {...restprops}>
      {address === ETH_ADDRESS ? (
        <>
          {!type || type === 'wallet' ? (
            <>
              (
              {numeral(
                new BigNumber(userEthBalance?.amount ?? 0)
                  .dividedBy(`1e18`)
                  .toFixed(2),
              ).format(NUMBER_FORMAT[4])}
              )
            </>
          ) : (
            <>
              (
              {numeral(
                new BigNumber(contractBalance?.balance ?? 0)
                  .dividedBy(`1e18`)
                  .toFixed(2),
              ).format(NUMBER_FORMAT[4])}
              )
            </>
          )}
        </>
      ) : (
        <>(20.0000)</>
      )}
    </Box>
  )
}

export default Balance

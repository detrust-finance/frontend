import React from 'react'
import _ from 'lodash'
// Components
import { Flex, Box } from 'rebass/styled-components'
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../../layout/modal'
import WalletModal from '../../../../libs/wallet/components/wallet-modal'
//import { Menu as MenuIcon, User } from 'react-feather'
// Hooks
import { useModal, useDrawer, useResponsive, useTheme } from '../../../../hooks'
import { useRouter } from 'next/router'
// Constants
import { menu, IMenu, SelectLanguageMenuProps } from '../../../../constants'
import { useTranslation } from 'react-i18next'
import DropDown from '../../../../components/dropw-down'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { shortenAddress } from '../../../../libs/wallet/utils'
//import MobileMenu from './mobile-menu'

const Header: React.FC = () => {
  const { colors, darkMode, fontSizes, fontWeight } = useTheme()
  const { t } = useTranslation('wallet')
  const { account } = useActiveWeb3React()

  const { isTablet } = useResponsive()

  const [toggleWalletModal] = useModal(
    //<Modal title={t('wallet.modal.title')}>
    <Modal>
      <WalletModal />
    </Modal>,
  )

  return (
    <Flex
      sx={{
        width: '100%',
        height: 106,
        justifyContent: 'space-between',
        alignItems: 'center',
        bg: darkMode ? colors.black : colors.white,
        px: [26, 26, 26, 140],
        pt: 20,
        position: 'fixed',
        top: 0,
        zIndex: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.03), 0px 100px 80px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* {isTablet ? (
        <DesktopNavigation />
      ) : (
        <>
          <MobileNavigation />
          <Link href='/' passHref>
            <Box>
              <Image src='/images/logo.svg' width={120} height={20} />
            </Box>
          </Link>
        </>
      )}
      <DesktopNavigation /> */}

      <Link href='/' passHref>
        <Box>
          <Image src='/images/logo.svg' width={137} height={25} />
        </Box>
      </Link>

      {/* <Box> */}
      <Flex
        alignItems='center'
        fontSize={fontSizes.lg}
        fontWeight={fontWeight.medium}
        // sx={{ cursor: 'pointer' }}
      >
        <DropDown
          buttonComponent={<SelectLanguageButton />}
          menuComponent={<SelectLanguageMenu />}
          menuStyle={{
            top: 32,
            left: -39.5,
          }}
        />
        {account && isTablet && shortenAddress(account, 12)}
        <Flex
          sx={{
            bg: account ? colors.jaffa : colors.grey[200],
            width: 40,
            height: 40,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.white,
            ml: 25,
            pr: '1px',
            cursor: 'pointer',
          }}
          onClick={toggleWalletModal}
        >
          <Image src='/images/user.svg' width={22} height={24} />
          {/* <User height={16} /> */}
        </Flex>
      </Flex>
      {/* </Box> */}
    </Flex>
  )
}

// const DesktopNavigation: React.FC = () => {
//   const { pathname } = useRouter()
//   const { t } = useTranslation('common')
//   return (
//     <Flex alignItems='center'>
//       <DropDown
//         buttonComponent={<SelectLanguageButton />}
//         menuComponent={<SelectLanguageMenu />}
//         menuStyle={{
//           top: 32,
//           left: -39.5,
//         }}
//       />
//       {menu.map((item: IMenu) => (
//         <Link
//           key={item.title}
//           href={_.isArray(item.path) ? item.path[0] : item.path}
//           passHref
//         >
//           <Box
//             variant='nav-item'
//             className={
//               `/${pathname.split('/')[1]}` ===
//               (_.isArray(item.path) ? item.path[0] : item.path)
//                 ? 'active'
//                 : undefined
//             }
//           >
//             {t(`nav.label.${item.title}`)}
//           </Box>
//         </Link>
//       ))}
//     </Flex>
//   )
// }

const SelectLanguageButton: React.FC = () => {
  const { colors } = useTheme()
  const { locale } = useRouter()

  return (
    <Flex
      variant='nav-item'
      sx={{
        py: '6.5px',
        textAlign: 'center',
        mr: [10, 10, 25, null],
        '&:hover': {
          color: colors.black,
        },
      }}
    >
      <Box mr='5.5px'>{locale}</Box>
      <Image src='/images/down.svg' width={9} height={5} />
     </Flex>
  )
}

const SelectLanguageMenu: React.FC<SelectLanguageMenuProps> = ({
  handleClose,
}) => {
  const { colors } = useTheme()
  const { asPath, locales } = useRouter()
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        width: 122,
        bg: colors.white,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: colors.red[100],
        boxShadow: '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481)',
        borderRadius: '6px',
        overflow: 'hidden',
        // '.arrow': {
        //   marginTop: '-6px',
        //   marginBottom: '1px',
        //   marginLeft: '45px',
        //   width: 0,
        //   height: 0,
        //   borderLeft: '5px solid transparent',
        //   borderRight: '5px solid transparent',
        //   borderBottom: `5px solid ${colors.red[100]}`,
        // },
      }}
    >
      {/* <Box className='arrow' /> */}
      {locales?.map((locale: string) => (
        <Box
          onClick={handleClose}
          key={locale}
          px={20}
          py='8px'
          textAlign='center'
          sx={{
            '&:hover': {
              bg: colors.grey[100],
            },
            '& a': {
              color: colors.black,
              textDecoration: 'none',
            },
          }}
        >
          <Link href={asPath} locale={locale}>
            {t(`lang.label.${locale}`)}
          </Link>
        </Box>
      ))}
    </Box>
  )
}

// const MobileNavigation: React.FC = () => {
//   const [openDrawer] = useDrawer(<MobileMenu />)
//   const { colors } = useTheme()
//   return (
//     <Box onClick={openDrawer}>
//       <MenuIcon color={colors.blue[500]} height={24} />
//     </Box>
//   )
// }

export default Header

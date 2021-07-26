import React from 'react'
import _ from 'lodash'
// Components
import { Flex, Box } from 'rebass/styled-components'
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../../layout/modal'
import WalletModal from '../../../../libs/wallet/components/wallet-modal'
import { Menu as MenuIcon, User } from 'react-feather'
// Hooks
import { useModal, useDrawer, useResponsive, useTheme } from '../../../../hooks'
import { useRouter } from 'next/router'
// Constants
import { menu, IMenu, SelectLanguageMenuProps } from '../../../../constants'
import { useTranslation } from 'react-i18next'
import DropDown from '../../../../components/dropw-down'
import { useActiveWeb3React } from '../../../../libs/wallet'
import { shortenAddress } from '../../../../libs/wallet/utils'
import MobileMenu from './mobile-menu'

const Header: React.FC = () => {
  const { colors, darkMode, fontSizes, fontWeight } = useTheme()
  const { t } = useTranslation('wallet')
  const { account } = useActiveWeb3React()

  const { isTablet } = useResponsive()

  const [toggleWalletModal] = useModal(
    <Modal title={t('wallet.modal.title')}>
      <WalletModal />
    </Modal>,
  )

  return (
    <Flex
      sx={{
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        bg: darkMode ? colors.black : colors.white,
        px: [20, 20, 20, 60],
        position: 'fixed',
        top: 0,
        zIndex: 10,
      }}
    >
      {isTablet ? (
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
      <Box>
        {account && (
          <Flex
            alignItems='center'
            fontSize={fontSizes.lg}
            fontWeight={fontWeight.medium}
            onClick={toggleWalletModal}
            sx={{ cursor: 'pointer' }}
          >
            {isTablet && shortenAddress(account, 12)}
            <Flex
              sx={{
                bg: colors.red[100],
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                color: colors.white,
                ml: 25,
                pr: '1px',
              }}
            >
              <User height={16} />
            </Flex>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

const DesktopNavigation: React.FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation('common')
  return (
    <Flex alignItems='center'>
      <DropDown
        buttonComponent={<SelectLanguageButton />}
        menuComponent={<SelectLanguageMenu />}
        menuStyle={{
          top: 32,
          left: -39.5,
        }}
      />
      {menu.map((item: IMenu) => (
        <Link
          key={item.title}
          href={_.isArray(item.path) ? item.path[0] : item.path}
          passHref
        >
          <Box
            variant='nav-item'
            className={
              `/${pathname.split('/')[1]}` ===
              (_.isArray(item.path) ? item.path[0] : item.path)
                ? 'active'
                : undefined
            }
          >
            {t(`nav.label.${item.title}`)}
          </Box>
        </Link>
      ))}
    </Flex>
  )
}

const SelectLanguageButton: React.FC = () => {
  const { colors } = useTheme()
  const { locale } = useRouter()

  return (
    <Box
      variant='nav-item'
      sx={{
        backgroundColor: colors.red[100],
        color: colors.white,
        py: '6.5px',
        width: 25,
        textAlign: 'center',
        mr: [10, 10, 25, null],
        '&:hover': {
          color: colors.white,
        },
      }}
    >
      {locale?.toUpperCase()}
    </Box>
  )
}

const SelectLanguageMenu: React.FC<SelectLanguageMenuProps> = ({
  handleClose,
}) => {
  const { colors } = useTheme()
  const { route, locales } = useRouter()
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        width: 100,
        bg: colors.white,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.red[100],
        '.arrow': {
          marginTop: '-6px',
          marginBottom: '1px',
          marginLeft: '45px',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: `5px solid ${colors.red[100]}`,
        },
      }}
    >
      <Box className='arrow' />
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
          <Link href={`${route}`} locale={locale}>
            {t(`lang.label.${locale}`)}
          </Link>
        </Box>
      ))}
    </Box>
  )
}

const MobileNavigation: React.FC = () => {
  const [openDrawer] = useDrawer(<MobileMenu />)
  const { colors } = useTheme()
  return (
    <Box onClick={openDrawer}>
      <MenuIcon color={colors.blue[500]} height={24} />
    </Box>
  )
}

export default Header

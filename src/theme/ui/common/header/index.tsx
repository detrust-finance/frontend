import React from 'react'
//import _ from 'lodash'
// Components
import { Flex, Box, Text } from 'rebass/styled-components'
import Image from 'next/image'
import Link from 'next/link'
//import { Menu as MenuIcon, User } from 'react-feather'
// Hooks
import { useDrawer, useResponsive, useTheme } from '../../../../hooks'
// Constants
import { useActiveWeb3React } from '../../../../libs/wallet'
import { shortenAddress } from '../../../../libs/wallet/utils'
import LanguageSelect from '../language-select'
import Account from '../account'
//import MobileMenu from './mobile-menu'

const Header: React.FC = () => {
  const { colors, darkMode, fontSizes, fontWeight } = useTheme()
  //const { t } = useTranslation('wallet')
  const { account } = useActiveWeb3React()

  const { isTablet } = useResponsive()

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
        <Box sx={{ cursor: 'pointer' }}>
          <Image src='/images/logo.svg' width={137} height={25} />
        </Box>
      </Link>

      <Flex
        alignItems='center'
        fontSize={fontSizes.lg}
        //fontWeight={fontWeight.medium}
        // sx={{ cursor: 'pointer' }}
      >
        <LanguageSelect />
        {account && isTablet &&
        <Text
          fontSize='17px'
          mr='25px'
        >
          {shortenAddress(account, 4)}
        </Text>}
        <Account size='40px' />
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

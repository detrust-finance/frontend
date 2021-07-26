import React from 'react'
import Link from 'next/link'
import _ from 'lodash'
// Hooks
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
// Components
import Image from 'next/image'
import { Box, Flex } from 'rebass/styled-components'
import { Spacer } from '../..'
import { IMenu, menu } from '../../../../constants'
import { useTheme } from '../../../../hooks'

interface NavMenuProps {
  onDismiss?: React.EffectCallback
}

const MobileMenu: React.FC<NavMenuProps> = ({ onDismiss }) => {
  const { t } = useTranslation('common')
  const { pathname, route, locales } = useRouter()
  const { spacer, fontSizes, colors, fontWeight } = useTheme()

  return (
    <Flex flexDirection='column' justifyContent='flex-start' width='100%'>
      <Box width='100%' mt={14}>
        <Flex flexDirection='row'>
          <Box>
            <Image src='/images/logo.svg' width={120} height={20} />
          </Box>
        </Flex>
      </Box>

      <Flex flexDirection='column' width='100%' my={spacer.xxxxxl}>
        {menu.map((item: IMenu) => (
          <Link
            key={item.title}
            href={_.isArray(item.path) ? item.path[0] : item.path}
            passHref
          >
            <Box
              variant='nav-item-mobile'
              onClick={onDismiss}
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

      <Flex
        flexDirection='column'
        width='100%'
        my={spacer.xxxxxl}
        sx={{ '& a': { textDecoration: 'none' } }}
      >
        <Box color={colors.blue[500]} fontWeight={fontWeight.medium}>
          Languages:
        </Box>
        {locales?.map((locale: string) => (
          <Link key={locale} href={`${route}`} locale={locale} passHref>
            <Box
              variant='nav-item-mobile'
              onClick={onDismiss}
              sx={{ fontSize: fontSizes.md, fontWeight: fontWeight.medium }}
            >
              {t(`lang.label.${locale}`)}
            </Box>
          </Link>
        ))}
      </Flex>

      <Box width='100%'>
        <Spacer size='xl' />
      </Box>
    </Flex>
  )
}

export default MobileMenu

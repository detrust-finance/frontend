import React from 'react'
import _ from 'lodash'
import classnames from 'classnames'
// Hooks
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
//  Components
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Text } from 'rebass/styled-components'
import { Spacer } from '../../theme/ui'
// Constants
import { sidebarMenu, ISidebarMenu } from '../../constants'

const MobileSidebar: React.FC = () => {
  return (
    <Flex variant='sidebar-nav-mobile'>
      {sidebarMenu.map((item: ISidebarMenu) => (
        <SidebarItem key={item.title} item={item} />
      ))}
    </Flex>
  )
}

const SidebarItem: React.FC<{ item: ISidebarMenu }> = ({ item }) => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const [isActive, setActive] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (_.isArray(item.path)) {
      item.path.map((path: string) => {
        if (router.pathname === path) setActive(true)
      })
      return
    } else {
      setActive(router.pathname === item.path)
      return
    }
  }, [item.path, router.pathname])
  const [hover, setHover] = React.useState<boolean>(false)
  return (
    <Link href={_.isArray(item.path) ? item.path[0] : item.path} passHref>
      <Flex
        variant='sidebar-nav-item-mobile'
        className={
          (item.exact && isActive) || (!item.exact && isActive)
            ? classnames(item.className, 'active')
            : item.className
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {(item.exact && router.pathname === item.path) ||
        (!item.exact && isActive) ? (
          <Image
            src={item.icon.path.mouseleave}
            width={16}
            height={16}
            alt={item.title}
          />
        ) : hover ? (
          <Image
            src={item.icon.path.mouseleave}
            width={16}
            height={16}
            alt={item.title}
          />
        ) : (
          <Image
            src={item.icon.path.mouseenter}
            width={16}
            height={16}
            alt={item.title}
          />
        )}
        <Spacer size='sm' />
        <Text as='span' fontWeight='bold' sx={{ textTransform: 'uppercase' }}>
          {t(`sidebar.label.${item.title}`)}
        </Text>
      </Flex>
    </Link>
  )
}

export default MobileSidebar

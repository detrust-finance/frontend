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

const Sidebar: React.FC = () => {
  return (
    <Flex variant='sidebar-nav'>
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
        variant='sidebar-nav-item'
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
            width={item.icon.width}
            height={item.icon.height}
            alt={item.title}
          />
        ) : hover ? (
          <Image
            src={item.icon.path.mouseleave}
            width={item.icon.width}
            height={item.icon.height}
            alt={item.title}
          />
        ) : (
          <Image
            src={item.icon.path.mouseenter}
            width={item.icon.width}
            height={item.icon.height}
            alt={item.title}
          />
        )}
        <Spacer size='xl' />
        <Text as='span' fontWeight='bold' sx={{ textTransform: 'uppercase' }}>
          {t(`sidebar.label.${item.title}`)}
        </Text>
        <Spacer size='sm' />
        <Text as='span' className='menucaption'>
          {t(`sidebar.label.${item.subtitle}`)}
        </Text>
      </Flex>
    </Link>
  )
}

export default Sidebar

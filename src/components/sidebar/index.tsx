import React from 'react'
import _ from 'lodash'
//import classnames from 'classnames'
// Hooks
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
//  Components
import Link from 'next/link'
//import Image from 'next/image'
import { Flex, Text, Box } from 'rebass/styled-components'
//import { Spacer } from '../../theme/ui'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
// Constants
import { sidebarMenu, ISidebarMenu } from '../../constants'
//import { toColorString } from 'polished'
import { useTheme } from '../../hooks'

const Sidebar: React.FC = () => {
  const { colors } = useTheme()
  const router = useRouter()
  const [left, setLeft] = React.useState<string | number>(0)
  React.useEffect(() => {
    for (const item of sidebarMenu) {
      if (_.isArray(item.path)) {
        item.path.map((path: string) => {
          if (router.pathname === path) {
            setLeft(item.left)
          }
        })
      } else {
        if (router.pathname === item.path) {
          setLeft(item.left)
        }
      }  
    }
  }, [router.pathname])
  return (
    <>
      <Flex variant='sidebar-nav'>
        {sidebarMenu.map((item: ISidebarMenu) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </Flex>
      <Box sx={{ width: '100%', height: 2 }}>
        <Box sx={{ width: '100%', height: '1px', bg: 'rgba(0, 0, 0, 0.1)', bottom: 0 }} />
        <Box sx={{
          position: 'relative',
          left: left,
          top: '-2px',
          width: '50%',
          height: '2px',
          bg: colors.jaffa,
        }} />
      </Box>
    </>
  )
}

const SidebarItem: React.FC<{ item: ISidebarMenu }> = ({ item }) => {
  const { t } = useTranslation('dashboard')
  //const router = useRouter()
  // const [isActive, setActive] = React.useState<boolean>(false)
  // React.useEffect(() => {
  //   if (_.isArray(item.path)) {
  //     item.path.map((path: string) => {
  //       if (router.pathname === path) setActive(true)
  //     })
  //     return
  //   } else {
  //     setActive(router.pathname === item.path)
  //     return
  //   }
  // }, [item.path, router.pathname])
  const [hover, setHover] = React.useState<boolean>(false)
  return (
    <Link href={_.isArray(item.path) ? item.path[0] : item.path} passHref>
      <Flex
        variant='sidebar-nav-item'
        // className={
        //   (item.exact && isActive) || (!item.exact && isActive)
        //     ? classnames(item.className, 'active')
        //     : item.className
        // }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* {(item.exact && router.pathname === item.path) ||
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
        )} */}
        {/* <Spacer size='xl' /> */}
        <Tippy
          placement='bottom'
          arrow
          theme='light'
          content={
            <Flex
              width='251px'
              height='61px'
              justifyContent='center'
              alignItems='center'
              fontFamily='hel'
              fontSize='17px'
            >{t(`sidebar.label.${item.subtitle}`)}</Flex>
          }
        >
          <Text
            as='span'
            sx={{
              textTransform: 'uppercase'
            }}>
            {t(`sidebar.label.${item.title}`)}
          </Text>
        </Tippy>
        {/* <Spacer size='sm' />
        <Text as='span' className='menucaption'>
          {t(`sidebar.label.${item.subtitle}`)}
        </Text> */}
      </Flex>
    </Link>
  )
}

export default Sidebar

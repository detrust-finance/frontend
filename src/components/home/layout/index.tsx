import React from 'react'
// Components
import { Layout } from '../../../theme/ui'

import { BoxProps } from 'rebass'

interface HomeLayoutProps extends BoxProps {
  layoutBackgroundImage?: string
}

const styles = {
  height: '100vh',
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  layoutBackgroundImage,
  ...restprops
}) => {
  return (
    <Layout
      {...restprops}
      px={0}
      sx={
        layoutBackgroundImage
          ? {
              backgroundImage: `url(${layoutBackgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 80%',
              backgroundPositionX: 'calc(65% + 525px)',
              backgroundPositionY: 'center',
              ...styles,
            }
          : styles
      }
    >
      {children}
    </Layout>
  )
}

export default HomeLayout

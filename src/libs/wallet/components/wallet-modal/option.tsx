import React from 'react'
import Image from 'next/image'
import { Flex, Box, Text } from 'rebass/styled-components'
import { ExternalLink } from '../../../../theme/components'
import { Button } from '../../../../theme/ui'
import { useTheme } from '../../../../hooks'

interface OptionProps {
  link?: string | null
  onClick?: any
  color: string
  header: React.ReactNode
  icon: any
  active?: boolean
  id: string
}

export const Option: React.FC<OptionProps> = ({
  link = null,
  onClick = null,
  header,
  icon,
  active = false,
  id,
}) => {
  const { colors } = useTheme()
  const content = (
    <Button
      variant='secondary'
      id={id}
      onClick={onClick}
      className={active ? 'active' : ''}
      width='100%'
    >
      <Flex alignItems='center' justifyContent='space-between' width='100%'>
        <Flex flexDirection='column' alignItems='flex-start'>
          <Text fontSize='lg'>{header}</Text>
        </Flex>
        <Box
          sx={{
            '.wallet-icon': {
              bg: colors.white,
              borderRadius: 1337,
              padding: '3px !important',
            },
          }}
        >
          <Image
            src={icon}
            alt='Icon'
            width={24}
            height={24}
            className='wallet-icon'
          />
        </Box>
      </Flex>
    </Button>
  )
  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>
  }

  return content
}

export default Option

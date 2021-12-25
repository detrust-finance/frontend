import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import { CheckCircle, Copy } from 'react-feather'
// Hooks
import { useTranslation } from 'react-i18next'
import { useCopyClipboard } from '../../hooks'
// Components
import { Button, ButtonProps } from '../../../../theme/ui'

interface CopyHelperProps extends ButtonProps {
  toCopy: string
}

const CopyHelper: React.FC<CopyHelperProps> = ({
  toCopy,
  children,
  ...restprops
}) => {
  const { t } = useTranslation('platform')
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <Button onClick={() => setCopied(toCopy)} {...restprops}>
      <Flex flexDirection='row' alignItems='center'>
        {isCopied ? (
          <>
            <CheckCircle size={'16'} />
            <Text ml='8px'>{t('copied')}</Text>
          </>
        ) : (
          <Copy color='grey' size={'16'} />
        )}
        {isCopied ? '' : children}
      </Flex>
    </Button>
  )
}

export default CopyHelper

import { Box, Flex, Text, Button } from "rebass/styled-components"
import { Spacer } from '../../theme/ui'
import { useTranslation } from 'react-i18next'
import { X } from 'react-feather'
import { useTheme } from "../../hooks"

interface Props {
  onDismiss: any
  trustId: number | string
}

function RevokeModal({ onDismiss, trustId }: Props) {
  const { t } = useTranslation()
  const { spacer } = useTheme()
  return (
    <Box>
      <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Text>{t('content.subtitle.settlor-edit.revoke.warning.label')}</Text>
        <X
          width='14px'
          height='14px'
          onClick={onDismiss}
          cursor='pointer'
          color='black'
        />
      </Flex>
      <Spacer size='xl' />
      <Text sx={{ textTransform: 'uppercase' }}>
        {t('content.subtitle.settlor-edit.revoke.warning.content')}
      </Text>
      <Spacer size='xl' />
      <Flex
        justifyContent='center'
        width='100%'
        mt={[spacer.xxxl, spacer.xxxl, 0]}
      >
        {/* <Link href={button.href} passHref> */}
          <Button
            py={13}
            px={41}
            // sx={{ textTransform: 'uppercase', cursor: 'default' }}
            variant='primary'
          >
            {t('button.label.determine')}
          </Button>
        {/* </Link> */}
        <Spacer size='xl' />
        <Button
          py={13}
          px={41}
          variant='grey-outline'
        //   onClick={button.onClick}
        >
          {t('button.label.cancel')}
        </Button>
      </Flex>
    </Box>
  )
}

export default RevokeModal

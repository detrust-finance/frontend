import { Box, Flex, Text, Button } from "rebass/styled-components"
import { useTranslation } from 'react-i18next'
import { X } from 'react-feather'
import { useResponsive } from "../../hooks"
import { useRouter } from "next/router"

interface Props {
  onDismiss?: any
  trustId: number | string
}

function SetIrrevocableModal({ onDismiss, trustId }: Props) {
  const { t } = useTranslation('dashboard')
  //const { spacer } = useTheme()
  const { isTablet } = useResponsive()
  const router = useRouter()

  const buttonProps = isTablet
  ? {
      width: 200,
    }
  : {
      flex: 1,
    }

  return (
    <Box>
      <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Text
          sx={{
            fontSize: '16px',
            lineHeight: '24px',
            mb: '30px',
        }}
        >
          {t('content.subtitle.settlor-edit.set-irrevocable.reminder.label')}
        </Text>
        <X
          width='14px'
          height='14px'
          onClick={onDismiss}
          cursor='pointer'
          color='black'
        />
      </Flex>
      <Text
        sx={{
          fontSize: '17px',
          lineHeight: '25px',
          mb: '40px',
        }}
      >
        {t('content.subtitle.settlor-edit.set-irrevocable.reminder.content')}
      </Text>
      <Flex
        justifyContent='space-between'
        width='100%'
        sx={{
          mb: '30px',
        }}
      >
        <Button
          height={52}
          variant='primary'
          onClick={() => {
            router.push(`/dashboard/settlor/set-irrevocable/${trustId}`)
            onDismiss?.()
          }}
          {...buttonProps}
        >
          {t('button.label.determine')}
        </Button>
        {/* <Spacer size='xxl' /> */}
        <Button
          height={52}
          variant='grey-outline'
          onClick={() => {
            onDismiss?.()
          }}
          {...buttonProps}
        >
          {t('button.label.cancel')}
        </Button>
      </Flex>
    </Box>
  )
}

export default SetIrrevocableModal

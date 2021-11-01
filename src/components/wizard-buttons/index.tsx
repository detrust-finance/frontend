import React from 'react'
import Link from 'next/link'
import { Flex } from 'rebass/styled-components'
import { Spacer, Button } from '../../theme/ui'
import { WizardButtonsProps, IWizardButton } from './interfaces'
import { useTheme } from '../../hooks'

const WizardButtons: React.FC<WizardButtonsProps> = ({
  buttons,
  disabledSubmit,
  ...restprops
}) => {
  const { spacer } = useTheme()
  return (
    <Flex
      justifyContent='center'
      width='100%'
      mt={[spacer.xxxl, spacer.xxxl, 0]}
      {...restprops}
    >
      {buttons.map((button: IWizardButton, index: number) => (
        <React.Fragment key={`wizard-button-${index}`}>
          {button.href ? (
            // <Link href={button.href} passHref>
              <Button
                href={button.href} passHref
                py={13}
                px={41}
                sx={{ textTransform: 'uppercase', cursor: 'default' }}
                variant={button.variant ? button.variant : 'primary'}
                {...button.buttonProps}
              >
                {button.title}
              </Button>
            // </Link>
          ) : (
            <Button
              py={13}
              px={41}
              sx={{ textTransform: 'uppercase' }}
              variant={button.variant ? button.variant : 'primary'}
              onClick={button.onClick}
              disabled={disabledSubmit}
              {...button.buttonProps}
            >
              {button.title}
            </Button>
          )}
          {index < buttons.length - 1 && <Spacer size='xl' />}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default WizardButtons

import React from 'react'
import { Flex } from 'rebass/styled-components'
import { Spacer } from '../../theme/ui'
import { Check } from 'react-feather'
import { IWizardHeader, WizardHeaderProps } from './interfaces'

const WizardHeader: React.FC<WizardHeaderProps> = ({ headers }) => (
  <Flex flexDirection='row' alignItems='center'>
    {headers.map((header: IWizardHeader, index: number) => (
      <React.Fragment key={`wizard-header-${index}`}>
        <Flex variant={`wizard-header-${header.status}`}>
          <Flex variant={`wizard-number-${header.status}`}>
            {header.status === 'done' ? <Check height={12} /> : header.number}
          </Flex>
          <Flex height={24} alignItems='center' justifyContent='center'>
            {header.title}
          </Flex>
        </Flex>
        {index < headers.length - 1 && <Spacer />}
      </React.Fragment>
    ))}
  </Flex>
)

export default WizardHeader

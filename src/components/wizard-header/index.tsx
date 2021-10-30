import React from 'react'
import { Flex, Box } from 'rebass/styled-components'
import { Spacer } from '../../theme/ui'
import { Check } from 'react-feather'
import { IWizardHeader, WizardHeaderProps } from './interfaces'
import { useTheme } from '../../hooks'

// const WizardHeader: React.FC<WizardHeaderProps> = ({ headers }) => (
//   <Flex flexDirection='row' alignItems='center'>
//     {headers.map((header: IWizardHeader, index: number) => (
//       <React.Fragment key={`wizard-header-${index}`}>
//         <Flex variant={`wizard-header-${header.status}`}>
//           <Flex variant={`wizard-number-${header.status}`}>
//             {header.status === 'done' ? <Check height={12} /> : header.number}
//           </Flex>
//           <Flex height={24} alignItems='center' justifyContent='center'>
//             {header.title}
//           </Flex>
//         </Flex>
//         {index < headers.length - 1 && <Spacer />}
//       </React.Fragment>
//     ))}
//   </Flex>
// )

const WizardHeader: React.FC<WizardHeaderProps> = ({ headers }) => {
  const n = headers.length + 1
  let p = 0
  for (const header of headers) {
    if (header.status === 'active') {
      p = header.number
    } else if (header.status === 'done') {
      p = header.number + 1
    }
  }

  const { colors } = useTheme()

  return <Box
    width='100%'
    height='2px'
    sx={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
      position: 'relative',
    }}
    mb={50}
  >
    <Box
      width={`${p/n*100}%`}
      height='2px'
      sx={{
        bg: colors.jaffa,
      }}
    />
      {headers.map((header: IWizardHeader, index: number) => (
        <React.Fragment key={`wizard-header-${index}`}>
          <Flex
            width={200}
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            sx={{
              position: 'absolute',
              top: '-9px',
              left: `calc(${header.number/n*100}% - 100px)`,
            }}
          >
            <Flex variant={`wizard-number-${header.status}`}>
              {header.status === 'done' ? <Check height={12} /> : header.number}
            </Flex>
            <Box mt='8px' height={24}>
              {header.title}
            </Box>
          </Flex>
          {index < headers.length - 1 && <Spacer />}
        </React.Fragment>
      ))}
  </Box>
}

export default WizardHeader

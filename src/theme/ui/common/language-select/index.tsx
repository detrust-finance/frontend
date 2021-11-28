import React from 'react'
import { Flex, Box, Text } from 'rebass/styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CheckCircledOutline } from 'iconoir-react'
//import { DropdownProps } from '../../../../components/dropw-down/interfaces'
import DropDown from '../../../../components/dropw-down'
import { useTheme } from '../../../../hooks'
import { SelectLanguageMenuProps } from '../../../../constants'
import { useTranslation } from 'react-i18next'

interface Props /*extends DropdownProps*/ {
  sx?: any
}

const LanguageSelect = ({ sx }: Props) => {
  return (
    <Box sx={sx}>
      <DropDown
        buttonComponent={<SelectLanguageButton />}
        menuComponent={<SelectLanguageMenu />}
        menuStyle={{
          top: 32,
          left: -39.5,
        }}
      />
    </Box>
  )
}

const SelectLanguageButton: React.FC = () => {
    const { colors } = useTheme()
    const { locale } = useRouter()
  
    return (
      <Flex
        variant='nav-item'
        sx={{
          py: '6.5px',
          textAlign: 'center',
          mr: [10, 10, 25, null],
          '&:hover': {
            color: colors.black,
          },
        }}
      >
        <Box mr='5.5px'>{locale}</Box>
        <Image src='/images/down.svg' width={9} height={5} />
       </Flex>
    )
  }
  
  const SelectLanguageMenu: React.FC<SelectLanguageMenuProps> = ({
    handleClose,
  }) => {
    const { colors } = useTheme()
    const { asPath, locale: curLocale, locales } = useRouter()
    const { t } = useTranslation('common')
  
    return (
      <Box
        sx={{
          py: '10px',
          bg: colors.white,
          // borderWidth: 1,
          // borderStyle: 'solid',
          // borderColor: colors.red[100],
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481)',
          borderRadius: '6px',
          overflow: 'hidden',
          fontFamily: 'hel',
          fontSize: '17px',
          // '.arrow': {
          //   marginTop: '-6px',
          //   marginBottom: '1px',
          //   marginLeft: '45px',
          //   width: 0,
          //   height: 0,
          //   borderLeft: '5px solid transparent',
          //   borderRight: '5px solid transparent',
          //   borderBottom: `5px solid ${colors.red[100]}`,
          // },
        }}
      >
        {/* <Box className='arrow' /> */}
        {locales?.map((locale: string) => (
          <Box
            onClick={handleClose}
            key={locale}
            px={20}
            py='20px'
            textAlign='center'
            sx={{
              cursor: 'pointer',
              '&:hover': {
                fontWeight: 'bold',
              },
              // '& a': {
              //   color: colors.black,
              //   textDecoration: 'none',
              // },
            }}
          >
            <Link href={asPath} locale={locale}>
              <Flex
              >
                <Box
                  width='17px'
                  height='17px'
                  mr='6px'
                >
                  {(locale === curLocale) &&
                    <CheckCircledOutline
                      color={colors.jaffa}
                      strokeWidth={2.5}
                      width='17px'
                      height='17px'/>}
                </Box>
                <Text
                  sx={{color: colors.black}}
                  pr='10px'
                >
                  {t(`lang.label.${locale}`)}
                </Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Box>
    )
  }
  
  export default LanguageSelect

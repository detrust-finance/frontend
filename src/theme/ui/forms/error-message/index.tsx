import { Box, BoxProps } from 'rebass/styled-components'
import { useTheme } from '../../../../hooks'

const ErrorMessage: React.FC<BoxProps> = ({ children, ...restprops }) => {
  const { colors, spacer } = useTheme()
  return (
    <Box as='p' color={colors.red[100]} my={spacer.sm} {...restprops}>
      {children}
    </Box>
  )
}

export default ErrorMessage

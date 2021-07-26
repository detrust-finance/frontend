import React from 'react'
import { Button as ButtonRebass, Flex } from 'rebass/styled-components'
// Interfaces
import { ButtonProps } from './interfaces'
// Styles
import { Loader } from '../../../../components/loader'

const Button = React.forwardRef<any, ButtonProps>(
  ({ loading, disabled, children, href, newWindow = false, ...rest }, ref) => {
    const [showLoader, setShowLoader] = React.useState<boolean>(false)

    React.useEffect(() => {
      if (loading) {
        setShowLoader(true)
      }

      if (!loading && showLoader) {
        const timeout = setTimeout(() => {
          setShowLoader(false)
        }, 200)

        return () => {
          clearTimeout(timeout)
        }
      }
    }, [loading, showLoader])

    return !href ? (
      <ButtonRebass disabled={loading || disabled} ref={ref} {...rest}>
        <Flex justifyContent='center' alignItems='center'>
          {showLoader ? <Loader size={60} /> : children}
        </Flex>
      </ButtonRebass>
    ) : (
      <ButtonRebass
        as='a'
        href={href}
        target={newWindow ? '_blank' : undefined}
        rel={newWindow ? 'noopener noreferrer' : undefined}
        ref={ref}
        {...rest}
      >
        <Flex justifyContent='center' alignItems='center'>
          {showLoader ? <Loader size={60} /> : children}
        </Flex>
      </ButtonRebass>
    )
  },
)

export default Button

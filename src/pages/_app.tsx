import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
// Styles
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import useDefaultTheme, { GlobalStyle } from '../theme'
import 'simplebar/dist/simplebar.min.css'
import 'react-datepicker/dist/react-datepicker.css'
// Language
import i18n from '../i18n'
import { ResponsiveContextProvider, PricesContextProvider } from '../contexts'
import { WalletContextProvider, Web3ReactManager } from '../libs/wallet'
import { MulticallContextProvider } from '../libs/multicall'
import { NetworkContextName } from '../libs/wallet/constants'
import getLibrary from '../libs/wallet/utils/getLibrary'
import { ModalsProvider, DrawerProvider } from '../theme/ui'
import { DetrustContextProvider } from '../libs/detrust'
import { QueryClientProvider, QueryClient } from 'react-query'
import { I18nextProvider } from 'react-i18next'
import { useRouter } from 'next/router'

//if (typeof window === 'undefined') return context
if (typeof window !== 'undefined' && 'ethereum' in window) {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const theme = useDefaultTheme()
  const { locale } = useRouter()
  React.useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <I18nextProvider i18n={i18n} defaultNS='common'>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <WalletContextProvider>
              <MulticallContextProvider>
                <DetrustContextProvider>
                  <Web3ReactManager>
                    <QueryClientProvider client={queryClient}>
                      <ThemeProvider theme={theme}>
                        <ResponsiveContextProvider>
                          <DrawerProvider>
                            <ModalsProvider>
                              <PricesContextProvider>
                                <Reset />
                                <GlobalStyle {...theme} />
                                <Component {...pageProps} />
                              </PricesContextProvider>
                            </ModalsProvider>
                          </DrawerProvider>
                        </ResponsiveContextProvider>
                      </ThemeProvider>
                    </QueryClientProvider>
                  </Web3ReactManager>
                </DetrustContextProvider>
              </MulticallContextProvider>
            </WalletContextProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </I18nextProvider>
    </>
  )
}

export default App

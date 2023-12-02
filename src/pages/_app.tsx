import Image from 'next/image'
import { AppProps } from 'next/app'

import beerLogo from '../assets/beerLogo.svg'

import { globalStyles } from '../styles/global'
import { Container, Header, Title } from '../styles/pages/app'

import { BeerProvider } from '../contexts/BeerContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={beerLogo.src} width={55} height={55} alt="" />
        <Title>Beer Collection</Title>
      </Header>
      <BeerProvider>
        <Component {...pageProps} />
      </BeerProvider>
    </Container>
  )
}

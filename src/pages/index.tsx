import Head from 'next/head'
import { GetStaticProps } from 'next'

import { useEffect } from 'react'

import Card from '../components/card'

import { useBeer } from '../contexts/BeerContext'

import { getAllBeers } from '../services/beerService'

import { BeerGrid, HomeContainer } from '../styles/pages/home'

interface HomeProps {
  beers: {
    id: string
    name: string
    description: string
    imageUrl: string
    firstBrewed: string
    abv: number
  }[]
}

export default function Home({ beers }: HomeProps) {
  const { beers: contextBeers, saveBeers } = useBeer()

  useEffect(() => {
    if (contextBeers.length === 0) {
      saveBeers(beers)
    }
  }, [beers, contextBeers.length, saveBeers])

  return (
    <>
      <Head>
        <title>Home | Beer Collection</title>
      </Head>

      <HomeContainer>
        <h2>Customer Collection</h2>

        <BeerGrid>
          {contextBeers?.map((beer) => <Card key={beer.id} beer={beer} />)}
        </BeerGrid>
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getAllBeers()

  const beers = response.map((beer) => {
    return {
      id: beer.id,
      name: beer.name,
      description: beer.description,
      imageUrl: beer.image_url,
      firstBrewed: beer.first_brewed,
      abv: beer.abv,
    }
  })

  return {
    props: {
      beers,
    },
  }
}

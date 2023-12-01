import { GetServerSideProps } from 'next'

import Card from '../components/card'

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
  return (
    <HomeContainer>
      <h2>Customer Collection</h2>

      <BeerGrid>
        {beers?.map((beer) => <Card key={beer.id} beer={beer} />)}
      </BeerGrid>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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

import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { useBeer } from '../contexts/BeerContext'

import { Card } from '../shared/card'
import { Modal } from '../shared/modal'
import { Button } from '../shared/button'

import { CreateForm } from '../components/create-form'

import { getAllBeers } from '../services/beerService'

import { BeerGrid, HomeContainer, HomeHeader } from '../styles/pages/home'
interface HomeProps {
  beers: {
    id: number
    name: string
    description: string
    imageUrl: string
    firstBrewed: string
    abv: number
  }[]
}

export default function Home({ beers }: HomeProps) {
  const [openModalCreateForm, setOpenModalCreateForm] = useState(false)

  const { beers: contextBeers, saveBeers } = useBeer()

  useEffect(() => {
    const storedBeers = JSON.parse(localStorage.getItem('beers')) || []

    if (storedBeers.length === 0) {
      saveBeers(beers)
    } else {
      saveBeers(storedBeers)
    }
  }, [beers, saveBeers])

  return (
    <>
      <Head>
        <title>Home | Beer Collection</title>
      </Head>

      <HomeContainer>
        <HomeHeader>
          <h2>Customer Collection</h2>
          <Button
            variant="outlined"
            text="Add New Beer"
            onClick={() => setOpenModalCreateForm(true)}
          />
        </HomeHeader>

        <BeerGrid>
          {contextBeers?.map((beer) => <Card key={beer.id} beer={beer} />)}
        </BeerGrid>
      </HomeContainer>

      {openModalCreateForm && (
        <Modal open={openModalCreateForm} setOpen={setOpenModalCreateForm}>
          <CreateForm setOpenModalCreateForm={setOpenModalCreateForm} />
        </Modal>
      )}
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

import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import { useBeer } from '../contexts/BeerContext'

import { Card } from '../shared/card'
import { Modal } from '../shared/modal'

import { CreateForm } from '../components/create-form'
import { BeerDetails } from '../components/beer-details'

import { getAllBeers } from '../services/beerService'

import {
  BeerGrid,
  HomeContainer,
  HomeHeader,
  ActionsContainer,
} from '../styles/pages/home'

interface Beer {
  id: number
  name: string
  description?: string
  imageUrl: string
  firstBrewed: string
  abv: number
  brewersTips?: string
}

interface HomeProps {
  beers: Beer[]
}

interface ModalDetailsState {
  isOpen: boolean
  beer: Beer | null
}

export default function Home({ beers }: HomeProps) {
  const [openModalCreateForm, setOpenModalCreateForm] = useState<boolean>(false)
  const [openModalDetails, setOpenModalDetails] = useState<ModalDetailsState>({
    isOpen: false,
    beer: null,
  })

  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { beers: contextBeers, saveBeers, sortBeers, filterBeers } = useBeer()

  useEffect(() => {
    const beerKeyExists = localStorage.getItem('beers') !== null
    const storedBeers = JSON.parse(localStorage.getItem('beers')) || []

    if (beerKeyExists && contextBeers.length === 0) {
      saveBeers(storedBeers)
    } else if (!beerKeyExists && contextBeers.length === 0) {
      saveBeers(beers)
    }
  }, [contextBeers, saveBeers, beers])

  function handleSortChange(event): void {
    sortBeers(event.target.value)
  }

  let searchTimer
  function handleSearchChange(): void {
    clearTimeout(searchTimer)

    setLoading(true)
    searchTimer = setTimeout(() => {
      filterBeers(searchValue)
      setLoading(false)
    }, 1000)
  }

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
            onClick={() => setOpenModalCreateForm(true)}
          >
            Add New Beer
          </Button>
        </HomeHeader>

        <ActionsContainer>
          <TextField
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            disabled={loading}
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  {loading && 'Loading...'}
                  <IconButton aria-label="search" onClick={handleSearchChange}>
                    <SearchIcon />
                  </IconButton>
                </>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="orderByLabel">Order by</InputLabel>
            <Select
              labelId="orderByLabel"
              id="selectOrder"
              label="Order by"
              defaultValue=""
              onChange={handleSortChange}
              disabled={loading}
            >
              <MenuItem value="abv">ABV</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="firstBrewed">First Brewed</MenuItem>
            </Select>
          </FormControl>
        </ActionsContainer>

        <BeerGrid>
          {contextBeers?.map((beer) => (
            <Card
              key={beer.id}
              beer={beer}
              onClick={() => setOpenModalDetails({ isOpen: true, beer })}
            />
          ))}
        </BeerGrid>
      </HomeContainer>

      {openModalCreateForm && (
        <Modal open={openModalCreateForm} setOpen={setOpenModalCreateForm}>
          <CreateForm setOpenModalCreateForm={setOpenModalCreateForm} />
        </Modal>
      )}

      {openModalDetails.isOpen && (
        <Modal open={openModalDetails.isOpen} setOpen={setOpenModalDetails}>
          <BeerDetails beer={openModalDetails.beer} />
        </Modal>
      )}
    </>
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
      foodPairing: beer.food_pairing,
      tips: beer.brewers_tips,
    }
  })

  return {
    props: {
      beers,
    },
  }
}

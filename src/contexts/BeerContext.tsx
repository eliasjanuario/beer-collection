import { ReactNode, createContext, useContext, useState } from 'react'

interface Beer {
  id: number
  name: string
  description?: string
  imageUrl?: string
  firstBrewed: string
  abv: number
}

interface BeerContextType {
  beers: Beer[]
  saveBeers: (beers: Beer[]) => void
  addBeer: (beer: object) => void
}

export const BeerContext = createContext<BeerContextType | undefined>(undefined)

interface BeerProviderProps {
  children: ReactNode
}

export function BeerProvider({ children }: BeerProviderProps) {
  const [beers, setBeers] = useState<Beer[]>([])

  function saveBeers(beers) {
    setBeers(beers)
    localStorage.setItem('beers', JSON.stringify(beers))
  }

  function addBeer(beer: Beer) {
    const normalizeBeerObject = {
      id: beers.length + 1,
      name: beer.name,
      description: beer.description || null,
      imageUrl: beer.imageUrl || null,
      firstBrewed: beer.firstBrewed,
      abv: beer.abv,
    }

    setBeers((prevBeers) => [...prevBeers, normalizeBeerObject])

    const storedBeers = JSON.parse(localStorage.getItem('beers')) || []
    localStorage.setItem(
      'beers',
      JSON.stringify([...storedBeers, normalizeBeerObject]),
    )
  }

  const value: BeerContextType = {
    beers,
    saveBeers,
    addBeer,
  }

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>
}

export function useBeer() {
  const context = useContext(BeerContext)

  if (!context) {
    throw new Error('useBeer must be used within a BeerProvider')
  }

  return context
}

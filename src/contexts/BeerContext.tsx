import { ReactNode, createContext, useContext, useState } from 'react'

interface Beer {
  id: number
  name: string
  description?: string
  imageUrl: string
  firstBrewed: string
  abv: number
  foodPairing?: string[]
  tips?: string
}

interface BeerContextType {
  beers: Beer[]
  saveBeers: (beers: Beer[]) => void
  addBeer: (beer: object) => void
  sortBeers: (string) => void
  filterBeers: (string) => void
}

export const BeerContext = createContext<BeerContextType | undefined>(undefined)

interface BeerProviderProps {
  children: ReactNode
}

export function BeerProvider({ children }: BeerProviderProps) {
  const [beers, setBeers] = useState<Beer[]>([])

  function saveBeers(beers: Beer[]): void {
    setBeers(beers)
    localStorage.setItem('beers', JSON.stringify(beers))
  }

  function addBeer(beer: Beer): void {
    const normalizeBeerObject = {
      id: beers.length + 1,
      name: beer.name,
      description: beer.description || null,
      imageUrl: beer.imageUrl || null,
      firstBrewed: beer.firstBrewed,
      abv: beer.abv,
      foodPairing: beer.foodPairing,
      tips: beer.tips,
    }

    setBeers((prevBeers) => [...prevBeers, normalizeBeerObject])

    const storedBeers = JSON.parse(localStorage.getItem('beers')) || []
    localStorage.setItem(
      'beers',
      JSON.stringify([...storedBeers, normalizeBeerObject]),
    )
  }

  function filterBeers(filterValue: string): void {
    if (filterValue === '') {
      const storedBeers = JSON.parse(localStorage.getItem('beers')) || []
      setBeers(storedBeers)
    } else {
      const lowerCaseFilter = filterValue.toLowerCase()
      const filteredBeers = beers.filter((beer) => {
        return (
          String(beer.name).toLowerCase().includes(lowerCaseFilter) ||
          String(beer.firstBrewed).toLowerCase().includes(lowerCaseFilter) ||
          String(beer.abv).toLowerCase().includes(lowerCaseFilter)
        )
      })

      setBeers(filteredBeers)
    }
  }

  function sortBeers(sortBy: 'name' | 'firstBrewed' | 'abv'): void {
    const sortedBeers = beers.slice().sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'firstBrewed') {
        const [aMonth, aYear] = a.firstBrewed.split('/')
        const [bMonth, bYear] = b.firstBrewed.split('/')

        return (
          parseInt(aYear) - parseInt(bYear) ||
          parseInt(aMonth) - parseInt(bMonth)
        )
      } else if (sortBy === 'abv') {
        return a.abv - b.abv
      }

      return 0
    })

    setBeers(sortedBeers)
  }

  const value: BeerContextType = {
    beers,
    saveBeers,
    addBeer,
    sortBeers,
    filterBeers,
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

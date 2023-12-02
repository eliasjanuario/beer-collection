import { ReactNode, createContext, useContext, useState } from 'react'

interface Beer {
  id: string
  name: string
  description: string
  imageUrl: string
  firstBrewed: string
  abv: number
}

interface BeerContextType {
  beers: Beer[]
  saveBeers: (beers: Beer[]) => void
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

  const value: BeerContextType = {
    beers,
    saveBeers,
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

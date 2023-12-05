import Image from 'next/image'
import { memo } from 'react'

import {
  DetailsContainer,
  DetailsContent,
} from '../../styles/components/beer-details'

interface BeerDetailsProps {
  beer: {
    id: number
    name: string
    description?: string
    imageUrl: string
    firstBrewed: string
    abv: number
    tips?: string
    foodPairing?: string[]
  }
}

export function BeerDetails({ beer }: BeerDetailsProps) {
  function renderFoodPairing() {
    if (beer.foodPairing?.length > 0) {
      return beer.foodPairing.map((food, index) => <p key={index}>{food}</p>)
    }
    return <p>No Food Pairing Yet.</p>
  }

  const MemoizedImage = memo(function MyComponent() {
    return (
      beer.imageUrl && (
        <Image
          src={beer.imageUrl}
          alt={`Image of ${beer.name}`}
          width={150}
          height={350}
        />
      )
    )
  })

  return (
    <DetailsContainer>
      <MemoizedImage />

      <DetailsContent>
        <h1>
          {beer.name} - {beer.abv}%
        </h1>

        <div>
          <h4>First Brewed:</h4>
          <p>{beer.firstBrewed}</p>
        </div>

        <div>
          <h4>Description:</h4>
          <p>{beer.description || 'No Description Yet.'}</p>
        </div>

        <div>
          <h4>Food Pairing:</h4>
          {renderFoodPairing()}
        </div>

        <div>
          <h4>Tips:</h4>
          <p>{beer.tips || 'No Tips Yet.'}</p>
        </div>
      </DetailsContent>
    </DetailsContainer>
  )
}

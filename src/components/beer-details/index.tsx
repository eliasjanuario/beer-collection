import Image from 'next/image'

import {
  DetailsContainer,
  DetailsContent,
} from '../../styles/components/beer-details'

interface BeerDetailsProps {
  beer: {
    id: number
    name: string
    description?: string
    imageUrl?: string
    firstBrewed: string
    abv: number
    tips?: string
    foodPairing?: [string]
  }
}

export function BeerDetails({ beer }: BeerDetailsProps) {
  return (
    <DetailsContainer>
      {beer.imageUrl && (
        <Image src={beer.imageUrl} alt="" width={200} height="500" />
      )}

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
          {beer.foodPairing?.length > 0 ? (
            beer.foodPairing.map((food, index) => <p key={index}>{food}</p>)
          ) : (
            <p>{'No Food Pairing Yet.'}</p>
          )}
        </div>

        <div>
          <h4>Tips:</h4>
          <p>{beer.tips || 'No Tips Yet.'}</p>
        </div>
      </DetailsContent>
    </DetailsContainer>
  )
}
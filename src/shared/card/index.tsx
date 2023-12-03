import Image from 'next/image'

import {
  CardContainer,
  CardContent,
  CardFooter,
} from '../../styles/shared/card'

export interface CardProps {
  beer: {
    id: number
    name: string
    description?: string
    imageUrl?: string
    firstBrewed: string
    abv: number
  }
}

export function Card({ beer }: CardProps) {
  return (
    <CardContainer>
      <CardContent>
        {beer.imageUrl && (
          <Image src={beer.imageUrl} alt="" width={200} height={200} />
        )}
        <h3>{beer.name}</h3>
      </CardContent>

      <CardFooter>
        <div>
          <h4>First Brewed</h4>
          <p>{beer.firstBrewed}</p>
        </div>
        <div>
          <h4>ABV</h4>
          <p>{beer.abv}%</p>
        </div>
      </CardFooter>
    </CardContainer>
  )
}

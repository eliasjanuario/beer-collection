import Image from 'next/image'
import { memo } from 'react'

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
    imageUrl: string
    firstBrewed: string
    abv: number
    brewersTips?: string
  }
  onClick: () => void
}

export function Card({ beer, onClick }: CardProps) {
  const MemoizedImage = memo(function MyComponent() {
    return (
      beer.imageUrl && (
        <Image
          src={beer.imageUrl}
          alt={`Image of ${beer.name}`}
          width={150}
          height={400}
        />
      )
    )
  })

  return (
    <CardContainer onClick={onClick}>
      <CardContent>
        <MemoizedImage />
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

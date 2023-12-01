import Image from 'next/image'

import {
  CardContainer,
  CardContent,
  CardFooter,
} from '../../styles/components/card'

export interface CardProps {
  beer: {
    id: string
    name: string
    description: string
    imageUrl: string
    firstBrewed: string
    abv: number
  }
}

export default function Card({ beer }: CardProps) {
  return (
    <CardContainer>
      <CardContent>
        <Image src={beer.imageUrl} alt="" width={200} height={200} />
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

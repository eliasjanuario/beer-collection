import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  maxWidth: 1100,

  padding: '1rem 0',
  margin: '0 auto',
})

export const BeerGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1rem',

  marginTop: '1rem',
})

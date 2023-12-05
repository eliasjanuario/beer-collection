import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 1100,
  padding: '1rem 0',
  margin: '0 auto',
})

export const HomeHeader = styled('div', {
  display: 'flex',
  margin: '0 1rem',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media only screen and (max-width: 468px)': {
    flexDirection: 'column',
    gap: '1rem',
  },
})

export const ActionsContainer = styled('div', {
  display: 'flex',
  padding: '1rem',
  gap: '0.5rem',

  '@media only screen and (max-width: 468px)': {
    flexDirection: 'column',
    gap: '1rem',
  },
})

export const BeerGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
  gap: '1rem',
  margin: '1rem',
})

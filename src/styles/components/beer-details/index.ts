import { styled } from '../..'

export const DetailsContainer = styled('div', {
  display: 'flex',

  padding: '1.5rem',

  '@media only screen and (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',

    img: {
      marginBottom: '1.5rem',
    },
  },
})

export const DetailsContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  padding: '0 2.5rem',

  h1: {
    marginBottom: '1rem',
  },

  'div + div': {
    marginTop: '1rem',
  },

  p: {
    marginTop: '0.5rem',
  },
})

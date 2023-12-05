import { styled } from '../..'

export const CardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',

  backgroundColor: '$white',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '1rem',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out',

  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.05)',
  },
})

export const CardContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '255px',

  img: {
    objectFit: 'contain',
  },

  h3: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '$gray1',
  },
})

export const CardFooter = styled('div', {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  width: '100%',
  marginTop: '1rem',

  borderTop: '1px solid $gray2',

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    h4: {
      marginTop: '1rem',
      fontSize: '0.8rem',
      color: '$gray1',
    },

    p: {
      fontSize: '0.8rem',
    },
  },
})

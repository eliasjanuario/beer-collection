import { styled } from '../..'

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',

  '.row': {
    display: 'flex',
    gap: '0.5rem',

    'div + div': {
      marginTop: '0',
    },
  },

  h3: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },

  'div + div': {
    marginTop: '1.5rem',
  },

  ul: {
    padding: '1.5rem',

    li: {
      height: '60px',
      padding: '0.5rem 0',
      borderBottom: '1px solid',
    },
  },

  '.formActions': {
    display: 'flex',
    width: '100%',
  },

  '@media only screen and (max-width: 768px)': {
    '.row': {
      flexDirection: 'column',
      gap: '1.5rem',
    },
  },
})

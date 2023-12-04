import { styled } from '../..'

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',

  h3: {
    marginBottom: '1.5rem',
  },

  'div + div': {
    marginTop: '1.5rem',
  },

  ul: {
    padding: '1.5rem',

    li: {
      padding: '0.5rem 0',
      borderBottom: '1px solid',
    },
  },
})

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
})

import { styled } from '../..'

export const ButtonContainer = styled('div', {
  button: {
    background: '$yellow',
    color: '$gray1',
    borderColor: '$yellow',

    '&:hover': {
      background: '$gray1',
      color: '$yellow',
      borderColor: '$yellow',
    },
  },
})

import { styled } from '../..'

export const ModalContainer = styled('div', {
  '.MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    width: '50%',
    background: '$white',
    padding: '1rem',
  },
})

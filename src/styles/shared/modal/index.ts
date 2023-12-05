import { styled } from '../..'

export const ModalContainer = styled('div', {
  // NOTE: This code snippet was not entirely written by me.
  // It includes contributions of Documentations or sections authored by others.
  '.MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    minWidth: 300,
    width: '50%',
    background: '$white',
    padding: '1rem',
    overflow: 'auto',
    // ----------------------------------------------------------------------------

    '@media only screen and (max-width: 768px)': {
      width: '90%',
    },
  },
})

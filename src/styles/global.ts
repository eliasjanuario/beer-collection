import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    backgroundColor: '$white',
    color: '$black',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  img: {
    objectFit: 'contain',
  },

  '.MuiButtonBase-root': {
    background: '$gray1',
    color: '$yellow',
    borderColor: '$gray1',

    '&:hover': {
      background: '$yellow',
      color: '$gray1',
      borderColor: '$gray1',
    },
  },
})

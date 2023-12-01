import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',

  width: '100%',
  maxWidth: 1100,

  padding: '2rem 0',
  margin: '0 auto',
})

export const Title = styled('h1', {
  fontFamily: 'Dancing Script',
})

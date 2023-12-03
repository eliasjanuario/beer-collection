import { ButtonProps, Button as MUIButton } from '@mui/material'

import { ButtonContainer } from '../../styles/shared/button'

interface SharedButtonProps extends ButtonProps {
  text: string
}

export function Button({ text, type, variant, onClick }: SharedButtonProps) {
  return (
    <ButtonContainer>
      <MUIButton type={type} variant={variant} onClick={onClick}>
        {text}
      </MUIButton>
    </ButtonContainer>
  )
}

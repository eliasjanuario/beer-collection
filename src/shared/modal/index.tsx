import { Box, Modal as MUIModal } from '@mui/material'
import { ModalContainer } from '../../styles/shared/modal'

export function Modal({ open, setOpen, children }) {
  return (
    <MUIModal open={open} onClose={() => setOpen(false)}>
      <ModalContainer>
        <Box>{children}</Box>
      </ModalContainer>
    </MUIModal>
  )
}

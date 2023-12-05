import { Dispatch, ReactNode } from 'react'
import { Box, Modal as MUIModal } from '@mui/material'

import { ModalContainer } from '../../styles/shared/modal'

interface ModalProps {
  open: boolean
  setOpen: Dispatch<boolean | object>
  children: ReactNode
}

export function Modal({ open, setOpen, children }: ModalProps) {
  return (
    <MUIModal open={open} onClose={() => setOpen(false)}>
      <ModalContainer>
        <Box>{children}</Box>
      </ModalContainer>
    </MUIModal>
  )
}

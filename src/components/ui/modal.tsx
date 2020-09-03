import React, { forwardRef, useImperativeHandle, RefForwardingComponent } from 'react'
import ReactDOM from 'react-dom'
import { Box } from 'rebass'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from { opacity: 0; top: 35%; }
  to { opacity: 1; top: 50%; }
`

const BoxContainer = styled(Box)`
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);

    > .content {
        min-width: 280px;
        padding: 16px 12px;
        position: fixed;
        background:  white;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        animation: ${rotate} 0.25s ease-out;
    }
`

export type TModalHandles = {
    open: () => void;
    close: () => void;
}

type TProps = {
    children: React.ReactNode | React.ReactNode[];
}

const ModalCompt: RefForwardingComponent<TModalHandles, TProps> = (
  props,
  ref
) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  useImperativeHandle(ref, () => {
    return { open, close }
  })

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return (isOpen
    ? ReactDOM.createPortal(
      <BoxContainer>
        <Box className='content'>
          {props.children}
        </Box>
      </BoxContainer>, document.getElementById('modal-root')!)
    : null
  )
}

export const Modal = forwardRef(ModalCompt)

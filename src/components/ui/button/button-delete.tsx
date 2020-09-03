import React from 'react'
import { Text } from 'rebass'
import { ReactComponent as Trash } from 'assets/trash.svg'
import { ButtonFlexStyled } from './button-upload'

type TProps = {
    onClick: () => void;
    text: string;
}

export function ButtonDelete ({ onClick, text }: TProps) {
  return (
    <ButtonFlexStyled
      alignItems='center'
      onClick={onClick}
    >
      <Trash fill='#000' height='16px' />
      <Text ml={1}>{text}</Text>
    </ButtonFlexStyled>
  )
}

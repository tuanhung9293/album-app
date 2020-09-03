import React from 'react'
import { Text, Box } from 'rebass'
import { ButtonFlexStyled } from './button-upload'

type TProps = {
    onClick: () => void;
    disabled?: boolean;
}

export function ButtonLoadMore ({ onClick, disabled = false }: TProps) {
  return (
    <Box
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <ButtonFlexStyled
        alignItems='center'
        sx={{
          pointerEvents: disabled ? 'none' : 'auto'
        }}
        onClick={onClick}
      >
        <Text ml={1} color={disabled ? '#888' : '#000'}>Load More</Text>
      </ButtonFlexStyled>
    </Box>
  )
}

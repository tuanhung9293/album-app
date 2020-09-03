import React from 'react'
import { Flex, Text, Box } from 'rebass'
import { ReactComponent as Upload } from 'assets/upload.svg'
import styled from 'styled-components'

type TProps = {
    onClick: () => void;
    disabled?: boolean;
}

export function ButtonUpload ({ onClick, disabled = false }: TProps) {
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
        <Upload fill={disabled ? '#888' : '#000'} height='16px' />
        <Text ml={1} color={disabled ? '#888' : '#000'}>Upload</Text>
      </ButtonFlexStyled>
    </Box>
  )
}

export const ButtonFlexStyled = styled(Flex)`
    cursor: pointer;
    padding: 6px;
    border-radius: 3px;

    :hover {
        background: #dcdcdcdc;
    }
`

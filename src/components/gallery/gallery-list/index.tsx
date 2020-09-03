import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from 'rebass'
import { TPhoto } from 'models/app.model'
import { Checkbox, Label } from '@rebass/forms'

type TProps = {
    photos: TPhoto[];
    selected: TPhoto[];
    toggleSelect: (photo: TPhoto) => void;
}

export function GalleryList ({ photos, selected, toggleSelect }: TProps) {
  const isSelectMode = selected.length > 0

  return (
    <Flex
      m={-2}
      flexWrap='wrap'
    >
      {photos.length === 0
        ? <Text textAlign='center' width={1} my={2} color='secondary'>No Result</Text>
        : (photos.map(photo =>
          <PhotoItem
            key={photo.id}
            photo={photo}
            isSelected={selected.some(item => item.id === photo.id)}
            isSelectMode={isSelectMode}
            onSelect={() => toggleSelect(photo)}
          />
        ))}
    </Flex>
  )
}

const BoxStyled = styled(Box)`
    position: relative;
    padding-bottom: 68%;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 3px;
    cursor: pointer;

    > div {
        display: none;
    }

    :hover > div {
        display: flex;
    }
`

type TPhotoItemProps = {
    photo: TPhoto;
    isSelected: boolean;
    isSelectMode: boolean;
    onSelect: () => void;
}

function PhotoItem ({ photo, isSelected, isSelectMode, onSelect }: TPhotoItemProps) {
  const isBlended = isSelectMode && !isSelected

  return (
    <Box
      p={2}
      width={[1, 1 / 2, 1 / 3, 1 / 5]}
    >
      <Box
        color='black'
      >
        <BoxStyled
          backgroundColor='bg_secondary'
          sx={{
            backgroundImage: `url('${encodeURI(photo.raw)}')`,
            backgroundBlendMode: isBlended ? 'soft-light' : 'unset'
          }}
          onClick={onSelect}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 1,
              left: 1,
              display: isSelected ? 'flex !important' : 'none'
            }}
          >
            <Label>
              <Checkbox
                checked={isSelected}
                onChange={() => { }}
              />
            </Label>
          </Box>
        </BoxStyled>
        <Text textAlign='center' fontSize={1} fontWeight='bold' mt={1}>{photo.name}</Text>
        <Text textAlign='center' fontSize={1}>{photo.album}</Text>
      </Box>
    </Box>
  )
}

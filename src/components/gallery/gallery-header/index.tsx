import React from 'react'
import { Flex, Text, Box } from 'rebass'
import { TLimit, INIT_LIMIT, LimitOptions } from 'models/app.model'
import { Select } from 'components/ui/select'
import { ButtonUpload } from 'components/ui/button/button-upload'
import { ButtonDelete } from 'components/ui/button/button-delete'

type TProps = {
    selectedCount: number;
    onDeletePhotos: () => void;
    onLimitChange: (limit: TLimit) => void;
    onOpenModal: () => void;
}

export function GalleryHeader ({ selectedCount, onLimitChange, onOpenModal, onDeletePhotos }: TProps) {
  return (
    <Flex
      mb={2}
      justifyContent='space-between'
      alignItems='center'
      flexWrap='wrap'
    >
      <Text fontSize={4} fontWeight='bold'>Photos</Text>
      <Flex
        alignItems='center'
      >
        {selectedCount > 0 &&
          <>
            <ButtonDelete
              onClick={onDeletePhotos}
              text={`Delete ${selectedCount} photos`}
            />
            <Box ml={1} mr={1}>|</Box>
          </>}
        <ButtonUpload onClick={onOpenModal} />
        <Box ml={1} mr={2}>|</Box>
        <Select
          initValue={INIT_LIMIT}
          options={LimitOptions}
          onSelect={(opt) => onLimitChange(opt.value as TLimit)}
        />
      </Flex>
    </Flex>
  )
}

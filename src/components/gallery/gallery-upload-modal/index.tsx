import React, { useState } from 'react'
import { Text, Flex, Box } from 'rebass'
import { AlbumTypeOptions, TAlbumType } from 'models/app.model'
import { Modal, TModalHandles } from 'components/ui/modal'
import { ReactComponent as Close } from 'assets/close.svg'
import { Select, ISelectOption } from 'components/ui/select'
import { Dropzone } from 'components/ui/dropzone'
import { ButtonUpload } from 'components/ui/button/button-upload'
import appAPI from 'apis/app.api'

type TProps = {
    modalRef: React.RefObject<TModalHandles>;
    onCloseModal: () => void;
}

export function GalleryUploadModal ({ modalRef, onCloseModal }: TProps) {
  const [files, setFiles] = useState<File[]>([])
  const [album, setAlbum] = useState<ISelectOption<TAlbumType> | undefined>()

  const handleCloseModal = () => {
    setFiles([])
    setAlbum(undefined)
    onCloseModal()
  }

  const handleUpload = async () => {
    await appAPI.uploadPhoto(album!.value, files)
    handleCloseModal()
  }

  return (
    <Modal ref={modalRef}>
      <Flex
        justifyContent='space-between'
        mb={5}
      >
        <Text fontSize={3} fontWeight='bold'>Upload photo</Text>
        <Box
          sx={{
            cursor: 'pointer'
          }}
        >
          <Close height='20px' onClick={handleCloseModal} />
        </Box>
      </Flex>
      <Dropzone
        onFilesChange={(f: File[]) => setFiles(f)}
      />
      <Flex
        justifyContent='space-between'
      >
        <Select
          placeholder='Select album'
          options={AlbumTypeOptions}
          onSelect={setAlbum}
        />
        <ButtonUpload
          onClick={handleUpload}
          disabled={files.length === 0 || !album}
        />
      </Flex>
    </Modal>
  )
}

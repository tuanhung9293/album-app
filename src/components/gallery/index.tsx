import React, { useEffect, useState, useCallback, useReducer, useRef } from 'react'
import { Box, Flex } from 'rebass'
import appAPI, { TDeleteMultiPhotosPayload } from 'apis/app.api'
import { TPhoto, TLimit, INIT_LIMIT } from 'models/app.model'
import { TModalHandles } from 'components/ui/modal'
import { useModal } from 'hooks/useModal'
import { photosReducer } from './reducer'
import { GalleryHeader } from './gallery-header'
import { GalleryList } from './gallery-list'
import { GalleryUploadModal } from './gallery-upload-modal'
import { ButtonLoadMore } from 'components/ui/button/button-load-more'

export function Gallery () {
  const modalRef = useRef<TModalHandles>(null)
  const { openModal, closeModal } = useModal(modalRef)

  const [photos, dispatch] = useReducer(photosReducer, [])
  const [skip, setSkip] = useState<number>(0)
  const [limit, setLimit] = useState<TLimit>(INIT_LIMIT.value as TLimit)
  const [selected, setSelected] = useState<TPhoto[]>([])
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const loadPhotos = async (skip: number, limit: number) => {
    setIsFetching(true)
    const resPhotosData = await appAPI.getListPhotos({ skip, limit })
    setIsFetching(false)
    setCanLoadMore(resPhotosData.length > 0)

    return resPhotosData
  }

  useEffect(() => {
    setSkip(0)
    setSelected([])
    const renewList = async () => {
      const resPhotos = await loadPhotos(0, limit)
      dispatch({ type: 'RENEW_PHOTOS', payload: resPhotos })
    }

    renewList()
  }, [limit])

  const loadMore = useCallback(async () => {
    const newSkip = skip + limit
    const resPhotos = await loadPhotos(newSkip, limit)
    dispatch({ type: 'ADD_MORE_PHOTOS', payload: resPhotos })

    setSkip(skip + limit)
  }, [skip, limit])

  const toggleSelect = (targetPhoto: TPhoto) => {
    const isExisting = selected.some(s => s.id === targetPhoto.id)
    const newSelected = isExisting ? selected.filter(s => s.id !== targetPhoto.id) : [...selected, targetPhoto]

    setSelected(newSelected)
  }

  const deletePhotos = async () => {
    const data = selected.reduce((deleteList, photo) => {
      const foundIndex = deleteList.findIndex(item => item.album === photo.album)
      if (foundIndex > -1) {
        deleteList[foundIndex].documents += `, ${photo.name}`
      } else {
        deleteList.push({ album: photo.album, documents: photo.name })
      }

      return deleteList
    }, [] as TDeleteMultiPhotosPayload)

    const isDone = await appAPI.deleteMultiPhotos(data)

    setSelected([])
    isDone && dispatch({ type: 'DELETE_PHOTOS', payload: selected })
  }

  return (
    <Box
      py={8}
      mx={[4, 6, 8, 12]}
    >
      <GalleryHeader
        selectedCount={selected.length}
        onDeletePhotos={deletePhotos}
        onLimitChange={setLimit}
        onOpenModal={openModal}
      />
      <GalleryList
        photos={photos}
        selected={selected}
        toggleSelect={toggleSelect}
      />
      <Flex
        mt={2}
        justifyContent='center'
      >
        <ButtonLoadMore
          onClick={loadMore}
          disabled={isFetching || !canLoadMore}
        />
      </Flex>
      <GalleryUploadModal
        modalRef={modalRef}
        onCloseModal={closeModal}
      />
    </Box>
  )
}

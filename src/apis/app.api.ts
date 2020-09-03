import { axiosInstance } from './axios'
import { AxiosResponse } from 'axios'
import { TPhoto, TAlbumType } from 'models/app.model'

type TGetListQuery = {
    skip: number;
    limit: number;
}

type TGetListResponse = {
    message: string;
    documents: TPhoto[];
    count: number;
    skip: number;
    limit: number;
}

const getListPhotos = async (query: TGetListQuery): Promise<TPhoto[]> => {
  const res: AxiosResponse<TGetListResponse> = await axiosInstance.post('/list', query)
  return res.data.documents
}

const uploadPhoto = async (album: TAlbumType, files: File[]): Promise<boolean> => {
  const formData = new FormData()
  formData.append('album', album)
  files.forEach(f => formData.append('documents', f))

  const res = await axiosInstance.put('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}

const deleteSinglePhoto = async (album: TAlbumType, fileName: string): Promise<boolean> => {
  const res = await axiosInstance.delete(`/${album}/${fileName}`)
  return res.data
}

export type TDeleteMultiPhotosPayload = Array<{
    album: TAlbumType;
    documents: string;
}>

const deleteMultiPhotos = async (payload: TDeleteMultiPhotosPayload): Promise<boolean> => {
  const res = await axiosInstance.delete('/', { data: payload })
  return res.data
}

const appAPI = {
  getListPhotos,
  uploadPhoto,
  deleteSinglePhoto,
  deleteMultiPhotos
}

export default appAPI

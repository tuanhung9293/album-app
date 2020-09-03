import { ISelectOption } from 'components/ui/select'
import { toCapitalize } from 'utils/string-handler'

// limit options
const LIMIT = [5, 10, 25, 50, 100, 250, 500] as const
export type TLimit = typeof LIMIT[number]

export const LimitOptions: ISelectOption<number>[] = LIMIT.map(num => ({ value: num, label: num.toString() }))
export const INIT_LIMIT = LimitOptions[1]

// album type options
const ALBUM_TYPE = ['travel', 'personal', 'food', 'nature', 'other']
export type TAlbumType = typeof ALBUM_TYPE[number]
export const AlbumTypeOptions: ISelectOption<string>[] = ALBUM_TYPE.map(type => ({ value: type, label: toCapitalize(type) }))

export type TPhoto = {
    id: string;
    album: TAlbumType;
    name: string;
    path: string;
    raw: string;
}

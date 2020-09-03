import { TPhoto } from 'models/app.model';

const PHOTOS_ACTION_TYPE = ['RENEW_PHOTOS', 'ADD_MORE_PHOTOS', 'DELETE_PHOTOS'] as const
type TPhotosActionType = typeof PHOTOS_ACTION_TYPE[number];

export function photosReducer(state: TPhoto[], action: { type: TPhotosActionType, payload: TPhoto[] }): TPhoto[] {
    switch (action.type) {
        case 'RENEW_PHOTOS':
            return action.payload
        case 'ADD_MORE_PHOTOS':
            return [...state, ...action.payload]
        case 'DELETE_PHOTOS':
            const newPhotos = state.filter(photo => !action.payload.some(item => item.id === photo.id));
            return newPhotos
        default:
            throw new Error();
    }
}

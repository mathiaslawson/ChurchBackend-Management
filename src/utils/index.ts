import { v4 as uuiv4 } from 'uuid'


export const generateId = () => {
    return uuiv4()
}
export const useTravelId = () => {
    return window.localStorage.getItem('tid') || ''
}

export const setTravelId = (id: string) => {
    window.localStorage.setItem('tid', id)
}

export const userUserId = () => {
    return window.localStorage.getItem('uid') || ''
}

export const setUserId = (id: string) => {
    window.localStorage.setItem('uid', id)
}

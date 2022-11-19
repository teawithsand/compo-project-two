import { User } from '../domain/model'

export const loginUser = (user: User | null) => {
    window.localStorage.setItem('user', user ? JSON.stringify(user) : '')
}


export const useUser = (): User | null => {
    const user = window.localStorage.getItem('user')
    if (!user) return null
    return JSON.parse(user)
}

export const getUser = useUser
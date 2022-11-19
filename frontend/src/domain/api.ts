import { Travel, User } from './model'

export const crud = <T>(path: string) => {
    return {
        clear: async () => {
            await fetch(path + '/set', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
        },
        set: async (entries: T[]) => {
            await fetch(path + '/set', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entries),
            })
        },
        create: async (data: T) => {
            await fetch(path, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        },
        update: async (data: T) => {
            await fetch(path, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        },

        list: async (): Promise<T[]> => {
            const res = await fetch(path, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })

            return await res.json()
        },

        get: async (id: string): Promise<T | null> => {
            const res = await fetch(path + '/' + id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })

            return await res.json()
        },
        delete: async (id: string) => {
            await fetch(path + '/' + id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            })
        },
    }
}

export const userApi = crud<User>('http://localhost:3001/api/user')
export const travelApi = crud<Travel>('http://localhost:3001/api/travel')
;(window as any).userApi = userApi
;(window as any).travelApi = travelApi

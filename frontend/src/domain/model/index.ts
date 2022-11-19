export type ObjectId = string

function uuidV4() {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c: any) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
    )
}

export const generateObjectId = () => uuidV4()

export * from './car'
export * from './travel'
export * from './user'
export * from './discussion'

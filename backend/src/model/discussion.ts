import { ObjectId } from "mongodb"

export type Comment = {
    owner: ObjectId
    content: string
    createdAtTimestamp: number
    lastEditedAtTimestamp: number | null
}
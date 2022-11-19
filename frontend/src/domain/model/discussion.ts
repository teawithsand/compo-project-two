import { ObjectId } from "."

export type Comment = {
    owner: ObjectId
    content: string
    createdAtTimestamp: number
}
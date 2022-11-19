import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Travel } from '../../domain/model'
import { travelApi } from '../../domain/api'
import { nowTimestamp } from '../../domain/time'
import { useUser } from '../User'

export const TravelDiscussionForm = (props: { travel: Travel }) => {
    const [text, setText] = useState('')
    const { travel } = props
    const u = useUser()

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()

                const p = async () => {
                    await travelApi.update({
                        ...travel,
                        discussion: [
                            ...travel.discussion,
                            {
                                content: text,
                                createdAtTimestamp: nowTimestamp(),
                                owner: u?._id || '',
                            },
                        ],
                    })

                    window.location.reload()
                }

                p()
            }}
        >
            <Form.Control
                value={text}
                onChange={(e) => {
                    setText(e.target.value || '')
                }}
                type="textarea"
            />
            <Button className="mt-3" type="submit">Dodaj komentarz</Button>
        </Form>
    )
}

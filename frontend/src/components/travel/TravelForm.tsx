import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Travel } from '../../domain/model'

export const TravelForm = (props: {
    baseData: Travel
    onSubmit?: (t: Travel) => void
}) => {
    const [data, setData] = useState<Travel>({} as any as Travel)

    useEffect(() => {
        setData({ ...props.baseData })
    }, [props.baseData])

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                if (props.onSubmit) props.onSubmit(data)
            }}
        >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Z kąd</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            from: e.target.value,
                        })
                    }
                    value={data.from}
                    type="text"
                />
                <Button
                    className="mt-2"
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                        data.from
                    )}`}
                    target="_blank"
                >
                    Podgląd w Google Maps
                </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Do kąd</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            to: e.target.value,
                        })
                    }
                    value={data.to}
                    type="text"
                />
                <Button
                    className="mt-2"
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                        data.from
                    )}`}
                    target="_blank"
                >
                    Podgląd w Google Maps
                </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Dystans w KM</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            distanceKm: e.target.value.trim()
                                ? parseInt(e.target.value)
                                : 0,
                        })
                    }
                    value={data.distanceKm}
                    type="number"
                />
                <Button
                    className="mt-2"
                    href={`https://www.google.com/maps/dir/${data.from || ''}/${
                        data.to || ''
                    }/`}
                    target="_blank"
                >
                    Podgląd trasy w Google Maps
                </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Data odjazdu</Form.Label>
                <Form.Control
                    onChange={(e) => {
                        setData({
                            ...data,
                            departDate: e.target.value,
                        })
                    }}
                    value={data.departDate}
                    type="date"
                />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

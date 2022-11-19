import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Car } from '../../domain/model'

export const CarForm = (props: {
    baseData: Car
    onSubmit?: (t: Car) => void
}) => {
    const [data, setData] = useState<Car>({} as any as Car)

    useEffect(() => {
        setData({ ...data })
    }, [data])

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                if (props.onSubmit) props.onSubmit(data)
            }}
        >
            <Form.Group className="mb-3">
                <Form.Label>Marka i model</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            name: e.target.value,
                        })
                    }
                    value={data.name}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Numer rejestracyjny</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            plateNumber: e.target.value,
                        })
                    }
                    value={data.plateNumber}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Objętość skokowa silnika(cm3)</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            displacementCubicCentimeter: e.target.value
                                ? parseInt(e.target.value)
                                : 0,
                        })
                    }
                    value={data.displacementCubicCentimeter}
                    type="number"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Ilość pasażerów</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            passengerSeats: e.target.value
                                ? parseInt(e.target.value)
                                : 0,
                        })
                    }
                    value={data.passengerSeats}
                    type="number"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Zatwierdź informacje o samochodzie
            </Button>
        </Form>
    )
}

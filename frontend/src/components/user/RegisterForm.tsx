import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { User } from '../../domain/model'

export const RegisterForm = (props: {
    baseData: User
    onSubmit?: (t: User) => void
}) => {
    const [data, setData] = useState<User>({} as any as User)

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
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            username: e.target.value,
                        })
                    }
                    value={data.username}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            email: e.target.value,
                        })
                    }
                    value={data.email}
                    type="text"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            password: e.target.value,
                        })
                    }
                    value={data.password}
                    type="password"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Numer telefonu</Form.Label>
                <Form.Control
                    onChange={(e) =>
                        setData({
                            ...data,
                            phoneNumber: e.target.value,
                        })
                    }
                    value={data.phoneNumber}
                    type="text"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Zarejestruj się
            </Button>
        </Form>
    )
}

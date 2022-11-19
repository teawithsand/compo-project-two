import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export type LoginData = {
    username: string
    password: string
}

export const LoginForm = (props: {
    baseData: LoginData
    onSubmit?: (t: LoginData) => void
}) => {
    const [data, setData] = useState<LoginData>({} as any as LoginData)

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
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login</Form.Label>
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Button variant="primary" type="submit">
                Zaloguj się
            </Button>
        </Form>
    )
}

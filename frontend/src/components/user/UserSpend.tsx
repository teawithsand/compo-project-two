import { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { foundationApi, userApi } from '../../domain/api'
import { Foundation } from '../../domain/model'
import React from 'react'
import { useUser } from '../User'
import { mockFoundations } from '../../domain/mockFoundations'

export const UserSpend = (props: { balance: number }) => {
    const { balance } = props
    const [foundations, setFoundations] = useState<null | Foundation[]>(null)
    useEffect(() => {
        ;(async () => {
            setFoundations(await foundationApi.list())
        })()
    }, [])

    const [toSpent, setToSpent] = useState('')
    useEffect(() => {
        setToSpent((Math.round(props.balance * 100) / 100).toString())
    }, [props.balance])

    const user = useUser()
    if (!user) return <></>
    if (!foundations) return <></>

    return (
        <div className="mt-3">
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <Form.Control
                    value={toSpent}
                    onChange={(e) => {
                        setToSpent(e.target.value)
                    }}
                    type="text"
                />
            </Form>
            <Table striped hover bordered>
                <thead>
                    <th>Lp.</th>
                    <th>Nazwa</th>
                    <th>Sumaryczne finansowanie</th>
                    <th>Akcje</th>
                </thead>
                <tbody>
                    {foundations.map((f, i) => {
                        return (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{f.name}</td>
                                <td>
                                    {Math.round(f.moneySpent * 100) / 100}zł
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            const value = parseFloat(toSpent)
                                            if (
                                                isFinite(value) &&
                                                value > 0 &&
                                                value < balance
                                            ) {
                                                const p = async () => {
                                                    f = {
                                                        ...f,
                                                        moneySpent:
                                                            f.moneySpent +
                                                            value,
                                                    }
                                                    await foundationApi.update(
                                                        f
                                                    )
                                                    await userApi.update({
                                                        ...user,
                                                        moneySpend:
                                                            user.moneySpend ??
                                                            0 + value,
                                                    })
                                                    window.location.reload()
                                                }

                                                p()
                                            }
                                        }}
                                    >
                                        Przekaż
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

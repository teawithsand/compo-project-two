import React, { useState } from 'react'
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Travel } from '../../domain/model'
import { setTravelId } from '../../domain/travelView'

export const TravelList = (props: { travels: Travel[] }) => {
    const navigate = useNavigate()
    const { travels: innerTravels } = props

    const [filter, setFilter] = useState('')

    const lowerCaseFilter = filter.toLowerCase()

    const filteredTravels = filter
        ? innerTravels.filter(
              (t) =>
                  t.from.toLowerCase().includes(lowerCaseFilter) ||
                  t.to.toLowerCase().includes(lowerCaseFilter) ||
                  (t.description || '').toLowerCase().includes(lowerCaseFilter)
          )
        : innerTravels

    const travels = filteredTravels.sort((a, b) =>
        -(a.departDate || "").localeCompare(b.departDate || "")
    )

    return (
        <div>
            <Form.Control
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value)
                }}
            />
            <Table striped hover bordered>
                <thead>
                    <th>Lp.</th>
                    <th>Z</th>
                    <th>Do</th>
                    <th>Kiedy</th>
                    <th>Akcja</th>
                </thead>
                <tbody>
                    {travels.map((t, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{t.from}</td>
                            <td>{t.to}</td>
                            <td>{t.departDate}</td>
                            <td>
                                <ButtonGroup>
                                    <Button
                                        onClick={() => {
                                            setTravelId(t._id)
                                            navigate('/travel/view')
                                        }}
                                        href="#"
                                    >
                                        Podgląd
                                    </Button>
                                    <Button
                                        href={`https://www.google.com/maps/dir/${t.from}/${t.to}/`}
                                    >
                                        Mapa
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

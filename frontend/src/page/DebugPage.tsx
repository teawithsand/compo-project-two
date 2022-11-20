import React from 'react'
import { Button } from 'react-bootstrap'
import { loginUser } from '../components/User'
import { travelApi, userApi } from '../domain/api'
import { mockFoundations } from '../domain/mockFoundations'

export const DebugPage = () => {
    return (
        <div>
            <div>
                <Button
                    onClick={() => {
                        loginUser(null)
                        const p = async () => {
                            await userApi.clear()
                            await travelApi.clear()
                            await mockFoundations()
                            window.location.reload()
                        }

                        p()
                    }}
                >
                    Clear all data
                </Button>
            </div>
        </div>
    )
}

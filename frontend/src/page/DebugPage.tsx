import React from 'react'
import { Button } from 'react-bootstrap'
import { loginUser } from '../components/User'
import { travelApi, userApi } from '../domain/api'

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
                            window.location.reload()
                        }

                        p()
                    }}
                >
                    Clear all data
                </Button>
            </div>
            <div className="mt-3">
                <Button
                    onClick={() => {
                        loginUser(null)
                        const p = async () => {
                            await userApi.clear()
                            await travelApi.clear()
                            window.location.reload()
                        }

                        p()
                    }}
                >
                    Clear all data and insert dummy data
                </Button>
            </div>
        </div>
    )
}

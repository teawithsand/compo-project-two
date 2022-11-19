import React from 'react'
import { Container } from 'react-bootstrap'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Navbar } from './components/layout/Navbar'
import { CarPage } from './page/CarPage'
import { DebugPage } from './page/DebugPage'
import { LoginPage } from './page/LoginPage'
import { RegisterPage } from './page/RegisterPage'
import { TravelCreatePage } from './page/TravelCreate'
import { TravelListPage } from './page/TravelListPage'
import { TravelViewPage } from './page/TravelView'
import { UserViewPage } from './page/UserView'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Container>
                    <Navbar />
                    <div className="mt-4"></div>
                    <Routes>
                        <Route path="/" element={<TravelListPage />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/car" element={<CarPage />}></Route>
                        <Route
                            path="/user/view"
                            element={<UserViewPage />}
                        ></Route>
                        <Route
                            path="/register"
                            element={<RegisterPage />}
                        ></Route>
                        <Route
                            path="/travel/view"
                            element={<TravelViewPage />}
                        ></Route>
                        <Route
                            path="/travel/create"
                            element={<TravelCreatePage />}
                        />
                        <Route
                            path="/travel/list"
                            element={<TravelListPage />}
                        />
                        <Route path="/debug" element={<DebugPage />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as any)
root.render(<App />)

export default App

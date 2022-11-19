import './App.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MyForm from './pages/FormPage'
import Layout from './components/Layout'
import ProfilePage from './pages/ProfilePage'

function App() {
    return (
        <BrowserRouter>

        <Layout />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/form" element={<MyForm />} />
                <Route path="profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App

import './App.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/form" element={<div />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

export default App

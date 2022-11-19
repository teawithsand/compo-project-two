import './App.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { Header } from './components/layout/Header'

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/quiz" element={<QuizPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

export default App

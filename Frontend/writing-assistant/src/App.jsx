import BookForm from './components/BookForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddChapter from './components/Chapter'
import './App.css'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BookForm />} />
      <Route path="/chapter" element={<AddChapter />} />
    </Routes>
 
    </BrowserRouter>
  )
}

export default App

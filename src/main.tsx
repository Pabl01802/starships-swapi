import ReactDOM from 'react-dom/client'
import { Home } from './components/Home/Home.tsx'
import { Starship } from './components/Starship/Starship.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/1' />} />
      <Route path='/:page' element={<Home />} />
      <Route path='/starships/:id' element={<Starship />} />
    </Routes>
  </BrowserRouter>
)

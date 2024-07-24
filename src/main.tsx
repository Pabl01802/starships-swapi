import ReactDOM from 'react-dom/client'
import { Home } from './components/Home/Home.tsx'
import { Starship } from './components/Starship/Starship.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AddShip } from './components/AddShip/AddShip.tsx'
import { LocalShips } from './components/LocalShips/LocalShips.tsx'
import { NotFound } from './components/NotFound/NotFound.tsx'
import { NavBar } from './components/NavBar/NavBar.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Navigate to='/1' />} />
      <Route path='/:page' element={<Home />} />
      <Route path='/starships/:id' element={<Starship />} />
      <Route path='/addShip' element={<AddShip />} />
      <Route path='/localShips' element={<LocalShips />} />
    </Routes>
  </BrowserRouter>
)

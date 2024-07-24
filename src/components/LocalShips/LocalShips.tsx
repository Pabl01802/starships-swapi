import { useState, useEffect } from 'react'
import { ShipsTable } from '../ShipsTable/ShipsTable'
import './LocalShips.css'

export const LocalShips = () => {

  const [error, setError] = useState('')
  const [ships, setShips] = useState()

  useEffect(() => {
    const allLocalShips = localStorage.getItem('localShips')
    if(allLocalShips){
      setShips(JSON.parse(allLocalShips))
    }
    else{
      setError('There are no ships saved in local storage')
    }
  }, [])

  return (
    <main className='local-ships-page'>
      {
        error ? error : (
          <ShipsTable ships={ships!} />
        )
      }
    </main>
  )
}

import { useState, useEffect } from 'react'
import { ShipsTable } from '../ShipsTable/ShipsTable'
import { IStarship } from '../../interfaces'
import { useSearchParams } from 'react-router-dom'
import { sortedShips } from '../functions'
import './LocalShips.css'

export const LocalShips = () => {

  const [search] = useSearchParams()

  const [error, setError] = useState('')
  const [ships, setShips] = useState<IStarship[] | null>(null)

  useEffect(() => {
    const allLocalShips = localStorage.getItem('localShips')
    if(allLocalShips){
      setShips(sortedShips(JSON.parse(allLocalShips), search.get('sort')!))
    }
    else{
      setError('There are no ships saved in local storage')
    }
  }, [])

  useEffect(() => {
    ships && setShips(sortedShips(ships, search.get('sort')?.toLowerCase()!))
  }, [search.get('sort')])

  return (
    <main className='local-ships-page'>
      {
        error ? error : (
          <ShipsTable ships={ships!} setShips={setShips!} />
        )
      }
    </main>
  )
}

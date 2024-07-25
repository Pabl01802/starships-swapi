import { useEffect, useState } from 'react'
import { IShipsTableProps, IStarship } from '../../interfaces'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { TableHeader } from '../TableHeader/TableHeader'
import './ShipsTable.css'

export const ShipsTable = ({ ships }:IShipsTableProps) => {

  const params = useParams()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [asc, setAsc] = useState<boolean | undefined>(searchParams.get('sort')?.toLowerCase().includes('asc'))
  const navigate = useNavigate()

  useEffect(() => {
    setAsc(searchParams.get('sort')?.toLowerCase().includes('asc'))
  }, [searchParams])

  const goToShipPage = (url:string) => {
    const isLocal = url.includes('local')
    let correctUrl = isLocal ? url : url.match(/(\d+)/);

    if(correctUrl) navigate(`/starships/${isLocal ? correctUrl : correctUrl[0]}`)
    else alert('This ship is unavailable')
  }

  const allShips = ships?.map((ship:IStarship, index) => (
    <tr key={`ship-${index}`} onClick={() => goToShipPage(ship.url)}>
      <td>{ship.name}</td>
      <td>{ship.model}</td>
      <td>{ship.manufacturer}</td>
      <td>{ship.cost_in_credits}</td>
      <td>{ship.crew}</td>
      <td>{ship.passengers}</td>
    </tr>
  ))

  return (
    <>
      {
        allShips?.length > 0
        ? (
          <table>
          <tbody>
            <tr>
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'name'} />
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'model'} />
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'manufacturer'} />
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'cost'} />
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'crew'} />
              <TableHeader page={params?.page! || location.pathname.slice(1)} asc={asc} property={'passengers'} />
            </tr>
            {allShips}
          </tbody>
        </table>
        )
        : <h3>There are no ships</h3>
      }
    </>
  )
}

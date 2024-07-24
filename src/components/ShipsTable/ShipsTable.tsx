import { IShipsTableProps, IStarship } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import './ShipsTable.css'

export const ShipsTable = ({ ships }:IShipsTableProps) => {

  const navigate = useNavigate()

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
              <th>Name</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Cost in credits</th>
              <th>Crew</th>
              <th>Passengers</th>
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

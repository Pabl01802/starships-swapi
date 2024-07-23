import { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Loading } from '../Loading/Loading'
import { IStarship, IPageInfo } from '../../interfaces'
import { Pages } from '../Pages/Pages'
import { useParams, useNavigate } from 'react-router-dom'

export const Home = () => { 

  const params = useParams()
  const navigate = useNavigate()

  const [starships, setStarships] = useState<IStarship[] | null>(null)
  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null)
  const [currentPage, setCurrentPage] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getData = async () => {
    try{
      const res = await axios.get(`https://swapi.dev/api/starships?page=${params.page}`)
      setStarships(res.data.results)
      setPageInfo({
        previous: res.data.previous,
        next: res.data.next,
        current: params.page!
      })
      setLoading(false)
    }catch(err){
      console.log(err)
      setError('Cannot load starships')
    }
  }

  useEffect(() => {
    setCurrentPage(params.page)
  })

  useEffect(() => {
    if(currentPage){
      getData()
      setLoading(true)
    }
  }, [currentPage])

  const goToShipPage = (url:string) => {
    let matches = url.match(/(\d+)/);

    if(matches) navigate(`/starships/${matches[0]}`)
    else alert('This ship is unavailable')
  }

  const allShips = starships?.map((ship:IStarship, index) => (
    <tr onClick={() => goToShipPage(ship.url)}>
      <td>{ship.name}</td>
      <td>{ship.model}</td>
      <td>{ship.manufacturer}</td>
      <td>{ship.cost_in_credits}</td>
      <td>{ship.crew}</td>
      <td>{ship.passengers}</td>
    </tr>
  ))

  return (
    <main className='home-page'>
      <h1>Galaxy starships</h1>
      <section className='table-section'>
        {
          error ? error : loading ? <Loading /> : (
            <>
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
              <Pages info={pageInfo!} />
            </>
          )
        }
      </section>
    </main>
  )
}
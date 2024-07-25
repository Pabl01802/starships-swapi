import { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Loading } from '../Loading/Loading'
import { IStarship, IPageInfo } from '../../interfaces'
import { Pages } from '../Pages/Pages'
import { useParams, useSearchParams } from 'react-router-dom'
import { ShipsTable } from '../ShipsTable/ShipsTable'
import { sortedShips } from '../functions'

export const Home = () => { 

  const params = useParams()

  const [search] = useSearchParams()
  const [starships, setStarships] = useState<IStarship[] | null>(null)
  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null)
  const [currentPage, setCurrentPage] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  const getData = async () => {
    try{
      const res = await axios.get(`https://swapi.dev/api/starships?page=${params.page}`)
      setStarships(sortedShips(res.data.results, search.get('sort')?.toLowerCase()!))
      setPageInfo({
        previous: res.data.previous,
        next: res.data.next,
        current: params.page!
      })
      setLoading(false)
    }catch(err){
      setError('Cannot load starships')
    }
  }

  useEffect(() => {
    setCurrentPage(params.page)
  })

  useEffect(() => {
    starships && setStarships(sortedShips(starships, search.get('sort')?.toLowerCase()!))
  }, [search.get('sort')])

  useEffect(() => {
    if(currentPage){
      getData()
      setLoading(true)
    }
  }, [currentPage])

  return (
    <main className='home-page'>
      <h1>Galaxy starships</h1>
      <section className='table-section'>
        {
          error ? error : loading ? <Loading /> : (
            <>
              <ShipsTable ships={starships!} setShips={setStarships} />
              <Pages info={pageInfo!} />
            </>
          )
        }
      </section>
    </main>
  )
}
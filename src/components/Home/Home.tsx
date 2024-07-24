import { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Loading } from '../Loading/Loading'
import { IStarship, IPageInfo } from '../../interfaces'
import { Pages } from '../Pages/Pages'
import { useParams } from 'react-router-dom'
import { ShipsTable } from '../ShipsTable/ShipsTable'

export const Home = () => { 

  const params = useParams()

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

  return (
    <main className='home-page'>
      <h1>Galaxy starships</h1>
      <section className='table-section'>
        {
          error ? error : loading ? <Loading /> : (
            <>
              <ShipsTable ships={starships!} />
              <Pages info={pageInfo!} />
            </>
          )
        }
      </section>
    </main>
  )
}
import { useState, useEffect } from 'react'
import { IPagesProps } from '../../interfaces'
import { Link, useParams } from 'react-router-dom'
import './Pages.css'

export const Pages = ({ info }:IPagesProps) => {

  const params = useParams()
  const [currentPage, setCurrentPage] = useState(params.page)

  const { previous, next } = info

  useEffect(() => {
    setCurrentPage(params.page)
  })

  return (
    <div className='change-page-container'>
      {
        previous && <Link to={`/${parseInt(currentPage!)-1}`} className='change-page-button'>Previous</Link>
      }
      {
        <p className='current-page'>{info.current}</p>
      }
      {
        next && <Link to={`/${parseInt(currentPage!)+1}`} className='change-page-button'>Next</Link>
      }
    </div>
  )
}
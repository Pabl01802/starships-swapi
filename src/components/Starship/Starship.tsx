import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../Loading/Loading'
import { IStarship } from '../../interfaces'
import './Starship.css'

export const Starship = () => {

  const params = useParams()

  const [current, setCurrent] = useState(params.id)
  const [starship, setStarship] = useState<IStarship | null>(null)
  const [loading ,setLoading] = useState(true)
  const [error, setError] = useState('')

  const getStarship = async () => {
    try{
      const res = await axios.get(`https://swapi.dev/api/starships/${current}`)
      setStarship(res.data)
      setLoading(false)
    }catch(err){
      setError('Cannot get starship')
    }
  }

  useEffect(() => {
    console.log(current)
    if(current){
      getStarship()
    }
  }, [current])

  return (
    <main className='starship-container'>
      {
        error ? error : loading ? <Loading /> : (
          <section>
            <h1>{starship?.name}</h1>
            <p>Model: {starship?.model}</p>
            <p>Manufacturer: {starship?.manufacturer}</p>
            <p>Cost: {starship?.cost_in_credits}</p>

            <p>Length: {starship?.length}</p>
            <p>Max speed: {starship?.max_atmospheric_speed}</p>
            <p>Crew: {starship?.crew}</p>

            <p>Passengers: {starship?.passengers}</p>
            <p>Cargo capacity: {starship?.cargo_capacity}</p>
            <p>Consumables: {starship?.consumables}</p>
            <p>Hyperdrive rating: {starship?.hyperdrive_rating}</p>
            <p>MGLT: {starship?.MGLT}</p>
            <p>Class: {starship?.starship_class}</p>
          </section>
        )
      }
    </main>
  )
}
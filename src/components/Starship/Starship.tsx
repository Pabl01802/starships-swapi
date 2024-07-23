import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../Loading/Loading'
import { IStarship } from '../../interfaces'
import { useForm } from "react-hook-form"
import { IInputs } from '../../interfaces'
import './Starship.css'

export const Starship = () => {

  const params = useParams()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm<IInputs>()

  const [current] = useState(params.id)
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
      const isLocal = current.includes('local')
      if(isLocal){
        try{
          const found = JSON.parse(localStorage.getItem('localShips')!).find((item:IStarship) => item.url === current)
          setLoading(false)
          setStarship(found)
        }catch(err){
          console.log(err)
          setError('Cannot find this ship')
        }
      }else getStarship()
    }
  }, [current])

  const handleSubmitForm = (data, e) => {
    const className = e.target.className
    if(className === 'save-button'){
      try{
        const index = JSON.parse(localStorage.getItem('localShips')!).findIndex((item:IStarship) => item.url === current)
        const allLocalShips = JSON.parse(localStorage.getItem('localShips')!)
        allLocalShips[index] = {...data, url: allLocalShips[index].url, createdAt: allLocalShips[index].createdAt, editedAt: new Date()}
        localStorage.setItem('localShips', JSON.stringify(allLocalShips))
      }catch(err){
        console.log(err)
        setError('Error while trying to edit a ship')
      }
    }else if(className === 'remove-button'){
      try{
        let allLocalShips = JSON.parse(localStorage.getItem('localShips')!)
        allLocalShips = allLocalShips.filter((ship:IStarship) => ship.url !== current)
        localStorage.setItem('localShips', JSON.stringify(allLocalShips))
        navigate('/localShips')
      }catch(err){
        console.log(err)
        setError('Error while trying to remove a ship')
      }
    }
  }

  return (
    <main className='starship-container'>
      {
        error ? error : loading ? <Loading /> : (
          <form className='add-ship-form'>
            <label>
              <span>Name</span>
              <input type='text' defaultValue={starship?.name} {...register('name')} required />
            </label>
            <label>
              <span>Model</span>
              <input type='text' defaultValue={starship?.model} {...register('model')} required />
            </label>
            <label>
              <span>Manufacturer</span>
              <input type='text' defaultValue={starship?.manufacturer} {...register('manufacturer')} required />
            </label>
            <label>
              <span>Cost in credits</span>
              <input type='number' defaultValue={starship?.cost_in_credits} {...register('cost_in_credits')} required />
            </label>
            <label>
              <span>Length</span>
              <input type='number' defaultValue={starship?.length} {...register('length')} required />
            </label>
            <label>
              <span>Max atmospheric speed</span>
              <input type='number' defaultValue={starship?.max_atmosphering_speed} {...register('max_atmospheric_speed')} required />
            </label>
            <label>
              <span>Crew</span>
              <input type='string' defaultValue={starship?.crew} {...register('crew')} />
            </label>
            <label>
              <span>Passengers</span>
              <input type='text' defaultValue={starship?.passengers} {...register('passengers')}/>
            </label>
            <label>
              <span>Cargo capacity</span>
              <input type='number' defaultValue={starship?.cargo_capacity} {...register('cargo_capacity')} required />
            </label>
            <label>
              <span>Consumables</span>
              <input type='text' defaultValue={starship?.consumables} {...register('consumables')} required />
            </label>
            <label>
              <span>Hyperdrive rating</span>
              <input type='number' defaultValue={starship?.hyperdrive_rating} {...register('hyperdrive_rating')} required />
            </label>
            <label>
              <span>MGLT</span>
              <input type='number' defaultValue={starship?.MGLT} {...register('MGLT')} required />
            </label>
            <label>
              <span>Starship class</span>
              <input type='text' defaultValue={starship?.starship_class} {...register('starship_class')} required />
            </label>
            {
              current?.includes('local') && (
                <>
                  <button onClick={handleSubmit((data, e) => handleSubmitForm(data, e))} className='save-button'>Save changes</button>
                  <button onClick={handleSubmit((data, e) => handleSubmitForm(data, e))} className='remove-button'>Remove</button>
                </>
              )
            }
          </form>
        )
      }
    </main>
  )
}
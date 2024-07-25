import { BaseSyntheticEvent, useEffect, useState } from 'react'
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
  const [isLocal] = useState(current?.includes('local'))
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
    if(current){
      const isLocal = current.includes('local')
      if(isLocal){
        try{
          const found = JSON.parse(localStorage.getItem('localShips')!).find((item:IStarship) => item.url === current)
          setLoading(false)
          if(!found) setError('Cannot find this ship')
          setStarship(found)
        }catch(err){
          setError('Cannot find this ship')
        }
      }else getStarship()
    }
  }, [current])

  const handleSubmitForm = (data:IInputs, e:BaseSyntheticEvent) => {
    const className = e.target.className
    if(className === 'save-button'){
      try{
        const index = JSON.parse(localStorage.getItem('localShips')!).findIndex((item:IStarship) => item.url === current)
        const allLocalShips = JSON.parse(localStorage.getItem('localShips')!)
        allLocalShips[index] = {...data, url: allLocalShips[index].url, createdAt: allLocalShips[index].createdAt, editedAt: new Date()}
        localStorage.setItem('localShips', JSON.stringify(allLocalShips))
      }catch(err){
        setError('Error while trying to edit a ship')
      }
    }else if(className === 'remove-button'){
      try{
        let allLocalShips = JSON.parse(localStorage.getItem('localShips')!)
        allLocalShips = allLocalShips.filter((ship:IStarship) => ship.url !== current)
        localStorage.setItem('localShips', JSON.stringify(allLocalShips))
        navigate('/localShips')
      }catch(err){
        setError('Error while trying to remove a ship')
      }
    }
  }

  return (
    <main className='starship-container'>
      {
        error ? error : loading ? <Loading /> : (
          <form className='ship-form'>
            <label className='ship-form-label'>
              <span>Name</span>
              <input type='text' defaultValue={starship?.name} disabled={!isLocal} {...register('name')} required />
            </label>
            <label className='ship-form-label'>
              <span>Model</span>
              <input type='text' defaultValue={starship?.model} disabled={!isLocal} {...register('model')} required />
            </label>
            <label className='ship-form-label'>
              <span>Manufacturer</span>
              <input type='text' defaultValue={starship?.manufacturer} disabled={!isLocal} {...register('manufacturer')} required />
            </label>
            <label className='ship-form-label'>
              <span>Cost in credits</span>
              <input type='number' defaultValue={starship?.cost_in_credits} disabled={!isLocal} {...register('cost_in_credits')} required />
            </label>
            <label className='ship-form-label'>
              <span>Length</span>
              <input type='number' defaultValue={starship?.length} disabled={!isLocal} {...register('length')} required />
            </label>
            <label className='ship-form-label'>
              <span>Max atmospheric speed</span>
              <input type='number' defaultValue={starship?.max_atmosphering_speed} disabled={!isLocal} {...register('max_atmospheric_speed')} required />
            </label>
            <label className='ship-form-label'>
              <span>Crew</span>
              <input type='text' defaultValue={starship?.crew} disabled={!isLocal} {...register('crew')} />
            </label>
            <label className='ship-form-label'>
              <span>Passengers</span>
              <input type='text' defaultValue={starship?.passengers} disabled={!isLocal} {...register('passengers')}/>
            </label>
            <label className='ship-form-label'>
              <span>Cargo capacity</span>
              <input type='number' defaultValue={starship?.cargo_capacity} disabled={!isLocal} {...register('cargo_capacity')} required />
            </label>
            <label className='ship-form-label'>
              <span>Consumables</span>
              <input type='text' defaultValue={starship?.consumables} disabled={!isLocal} {...register('consumables')} required />
            </label>
            <label className='ship-form-label'>
              <span>Hyperdrive rating</span>
              <input type='number' defaultValue={starship?.hyperdrive_rating} disabled={!isLocal} {...register('hyperdrive_rating')} required />
            </label>
            <label className='ship-form-label'>
              <span>MGLT</span>
              <input type='number' defaultValue={starship?.MGLT} disabled={!isLocal} {...register('MGLT')} required />
            </label>
            <label className='ship-form-label'>
              <span>Starship class</span>
              <input type='text' defaultValue={starship?.starship_class} disabled={!isLocal} {...register('starship_class')} required />
            </label>
            {
              current?.includes('local') && (
                <div className='buttons'>
                  <button onClick={handleSubmit((data, e) => handleSubmitForm(data, e!))} className='save-button'>Save changes</button>
                  <button onClick={handleSubmit((data, e) => handleSubmitForm(data, e!))} className='remove-button'>Remove</button>
                </div>
              )
            }
          </form>
        )
      }
    </main>
  )
}
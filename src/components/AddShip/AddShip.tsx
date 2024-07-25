import './AddShip.css'
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from "react-hook-form"
import { IInputs } from '../../interfaces'
import { LocalStarshipSchema } from '../../schemas/schemas';
import { z, ZodError } from 'zod'

export const AddShip = () => {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IInputs>()

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    const localShips = localStorage.getItem('localShips')
    const id = uuidv4()
    const dataObject = {...data, url: `local-${id}`, createdAt: new Date()}

    try{
      LocalStarshipSchema.parse(data)
      if(localShips){
        const parsedLocal = JSON.parse(localShips)
        parsedLocal.push(dataObject)
        localStorage.setItem('localShips', JSON.stringify(parsedLocal))
      }else{
        localStorage.setItem('localShips', JSON.stringify([dataObject]))
      }
      reset()
    }catch(err){
      if(err instanceof ZodError){
        alert(JSON.parse(err)[0].message)
      }else alert('An unexpected error occured')
    }
  }

  return (
    <main className='add-ship-page'>
      <h1>Add ship</h1>
      <form className='add-ship-form' onSubmit={handleSubmit(onSubmit)}>
        <label className='add-ship-label'>
          <span>Name</span>
          <input type='text' {...register('name')} />
        </label>
        <label className='add-ship-label'>
          <span>Model</span>
          <input type='text' {...register('model')} />
        </label>
        <label className='add-ship-label'>
          <span>Manufacturer</span>
          <input type='text' {...register('manufacturer')} />
        </label>
        <label className='add-ship-label'>
          <span>Cost in credits</span>
          <input type='number' {...register('cost_in_credits', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Length</span>
          <input type='number' {...register('length', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Max atmospheric speed</span>
          <input type='number' {...register('max_atmospheric_speed', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Crew</span>
          <input type='number' {...register('crew', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Passengers</span>
          <input type='text' {...register('passengers')}/>
        </label>
        <label className='add-ship-label'>
          <span>Cargo capacity</span>
          <input type='number' {...register('cargo_capacity', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Consumables</span>
          <input type='text' {...register('consumables')} />
        </label>
        <label className='add-ship-label'>
          <span>Hyperdrive rating</span>
          <input type='number' {...register('hyperdrive_rating', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>MGLT</span>
          <input type='number' {...register('MGLT', { valueAsNumber: true })} />
        </label>
        <label className='add-ship-label'>
          <span>Starship class</span>
          <input type='text' {...register('starship_class')} />
        </label>
        <input type='submit' value='Create' />
      </form>
    </main>
  )
}

import { z } from 'zod'

export const LocalStarshipSchema = z.object({
  name: z.string({ required_error: 'dws' }).trim().min(1, { message: 'Provide a name' }),
  model: z.string().trim().min(1, { message: 'Provide a model' }),
  manufacturer: z.string().trim().min(1, { message: 'Provide a manufacturer' }),
  cost_in_credits: z.number({ message: 'Provide a cost' }).positive(),
  length: z.number({ message: 'Provide a length' }).positive(),
  max_atmospheric_speed: z.number({ message: 'Provide a max speed' }).positive(),
  crew: z.number().positive().optional(),
  passengers: z.string().trim().optional(),
  cargo_capacity: z.number({ message: 'Provide a cargo capacity' }).positive(),
  consumables: z.string().trim().min(1, { message: 'Provide consumables' }),
  hyperdrive_rating: z.number({ message: 'Provide a hyperdrive rating' }).positive(),
  MGLT: z.number({ message: 'Provide MGLT' }).positive(),
  starship_class: z.string().trim().min(1, { message: 'Provide a starship class' }),
})
import { Dispatch, SetStateAction } from "react"

export interface IStarship {
  MGLT: string,
  cargo_capacity: string,
  consumables: string,
  cost_in_credits: string,
  created: string,
  crew: string,
  edited: string,
  films: string[],
  hyperdrive_rating: string,
  length: string,
  manufacturer: string,
  max_atmosphering_speed: string,
  model: string,
  name: string,
  passengers: string,
  pilots: string[],
  starship_class: string,
  url: string
}

export interface IPageInfo {
  next: string | null,
  previous: string | null,
  current: string
}

export interface IPagesProps{
  info: IPageInfo
}

export interface IInputs{
  MGLT: number,
  cargo_capacity: number,
  consumables: string,
  cost_in_credits: number,
  crew: number,
  hyperdrive_rating: number,
  length: number,
  manufacturer: string,
  max_atmospheric_speed: number,
  model: string,
  name: string,
  passengers: string,
  starship_class: string,
}

export interface IShipsTableProps {
  ships: IStarship[],
  setShips: Dispatch<SetStateAction<IStarship[] | null>>
}

export interface ILinkButtonProps{
  text: string,
  to: string,
  bg?: string,
  color?: string
}

export interface IArrowIconProps{
  asc: boolean
}

export interface ITableHeaderProps{
  page: string,
  asc: boolean | undefined,
  property: string,
}
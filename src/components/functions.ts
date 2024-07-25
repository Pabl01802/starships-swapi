import { IStarship } from "../interfaces"

export const sortedShips = (data:IStarship[], p:string) => {
  if(p?.includes('name')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }else if(p?.includes('model')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? a.model.localeCompare(b.model) : b.model.localeCompare(a.model))
  }else if(p?.includes('manufacturer')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? a.manufacturer.localeCompare(b.manufacturer) : b.manufacturer.localeCompare(a.manufacturer))
  }else if(p?.includes('cost')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? parseInt(a.cost_in_credits === 'unknown'  ? '0' : a.cost_in_credits) - parseInt(b.cost_in_credits === 'unknown' ? '0' : b.cost_in_credits) : parseInt(b.cost_in_credits === 'unknown' ? '0' : b.cost_in_credits) - parseInt(a.cost_in_credits === 'unknown' ? '0' : a.cost_in_credits))
  }else if(p?.includes('crew')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? parseInt(a.crew) - parseInt(b.crew) : parseInt(b.crew) - parseInt(a.crew))
  }
  else if(p?.includes('passengers')){
    return data.sort((a, b) => p?.toLowerCase().includes('asc') ? parseInt(a.passengers) - parseInt(b.passengers) : parseInt(b.passengers) - parseInt(a.passengers))
  }
  return data
}
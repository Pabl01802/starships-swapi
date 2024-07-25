import { Link, useSearchParams } from 'react-router-dom'
import { ITableHeaderProps } from '../../interfaces'
import { ArrowIcon } from '../ArrowIcon/ArrowIcon'
import './TableHeader.css'
 
export const TableHeader = ({ page, asc, property }:ITableHeaderProps) => {

  const [params] = useSearchParams()

  return (
    <th className='table-header'>
      <Link className='table-header-button' to={`/${page}?sort=${asc ? `${property}Desc` : `${property}Asc`}`}>
        {property}
        {
        asc !== undefined && params.get('sort')?.includes(property) && <ArrowIcon asc={asc} />
        }
      </Link>
    </th>
  )
}
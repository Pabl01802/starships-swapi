import { Link } from 'react-router-dom'
import { ILinkButtonProps } from '../../interfaces'
import './LinkButton.css'

export const LinkButton = ({ text, to, bg, color }:ILinkButtonProps) => {
  return (
    <Link to={to} className='link-button' style={{ 'backgroundColor': bg || 'black', 'color': color || 'white' }}>{text}</Link>
  )
}
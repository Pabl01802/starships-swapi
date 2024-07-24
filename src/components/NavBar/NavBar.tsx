import './NavBar.css'
import { LinkButton } from '../LinkButton/LinkButton.tsx'
 
export const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-links'>
        <li className='navbar-item'>
          <LinkButton text='All ships' to='/1' />
        </li>
        <li className='navbar-item'>
          <LinkButton text='Local ships' to='/localShips' />
        </li>
        <li className='navbar-item'>
          <LinkButton text='Add ship' to='/addShip' />
        </li>
      </ul>
    </nav>
  )
}

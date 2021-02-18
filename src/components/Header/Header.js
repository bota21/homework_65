import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return <header className='header'>
    <div className='logo'>My Blog</div>
    <nav className='menu'>
        <NavLink exact to='/' className='menu_link' activeClassName='menu_active'>Home</NavLink>
        <NavLink to='/posts/add' className='menu_link' activeClassName='menu_active'>Add</NavLink>
        <NavLink to='/about' className='menu_link' activeClassName='menu_active'>About</NavLink>
        <NavLink to='/contacts' className='menu_link' activeClassName='menu_active'>Contacts</NavLink>
    </nav>
    </header>
}
export default Header
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
        <a href="#" className="nav-item">HOME</a>
        <a href="#" className="nav-item">ABOUT</a>
        <a href="#" className="nav-item">MENU</a>
        <Link to="/booking" className="nav-item">RESERVATIONS</Link>
        <a href="#" className="nav-item">ORDER ONLINE</a>
        <a href="#" className="nav-item">LOGIN</a>
      </nav>
    );
  }
  
  export default Nav;
  
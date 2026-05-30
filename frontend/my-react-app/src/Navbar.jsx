import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Civic Services</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/citizen-register">Citizen Register</Link></li>
        <li><Link to="/officer-register">Officer Register</Link></li>
          <li><Link to="/staff-register">Staff Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

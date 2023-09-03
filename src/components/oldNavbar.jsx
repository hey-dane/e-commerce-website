import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h4>e-commerce</h4>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/allproducts" className="nav-link">
            All Products
          </Link>
        </li>
        {loggedIn && (
          <li className="nav-item">
            <Link to="/createlisting" className="nav-link">
              Create Listing
            </Link>
          </li>
        )}
        {!loggedIn && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {loggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

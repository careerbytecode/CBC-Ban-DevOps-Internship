import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>

      <nav>

        <div className="logo">
          FlavorForge
        </div>


        <button type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>


        <div
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/recipes" onClick={() => setMenuOpen(false)}>
            Recipes
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

        </div>

      </nav>

    </header>
  );
}

export default Header;
import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { SimpleContext } from "../services/Context"

function Header() {
  const { setSearchQuery, setCurrentPage } = useContext(SimpleContext)
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchQuery(searchInput)
      setCurrentPage(1)
    }
  }

  return (
    <nav className="navbar custom-navbar sticky-top">
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
          <span className="badge-new">NEW</span>
          <span className="text-white fw-semibold me-2">MOVIE</span>
          <span className="location-text">📍 Kozhikode, Kerala</span>
        </div>
        <ul className="navbar-nav flex-row mx-auto gap-4">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              New Movie
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Genre
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Country
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Movie
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              TV Series
            </a>
          </li>
        </ul>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Header

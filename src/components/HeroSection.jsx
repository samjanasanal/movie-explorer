import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { SimpleContext } from "../services/Context"

function HeroSection() {
  const { featuredMovie } = useContext(SimpleContext)
  const navigate = useNavigate()

  if (!featuredMovie || featuredMovie.Response === "False") {
    return (
      <section className="hero-default">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="fw-bold hero-title">Featured Movie</h1>
            <p className="hero-description">Discover and book the latest blockbuster movies in HD quality.</p>
            <button className="btn btn-danger btn-lg">Explore Now</button>
          </div>
        </div>
      </section>
    )
  }

  const posterUrl = featuredMovie.Poster !== "N/A" ? featuredMovie.Poster : "/movie-hero.jpg"

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${posterUrl})`,
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center hero-content">
          <div className="col-md-4 ps-5">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={featuredMovie.Title}
              className="movie-poster img-fluid rounded-lg"
            />
          </div>

          <div className="col-md-8 pe-5">
            <div className="hero-info">
              <h1 className="hero-title">{featuredMovie.Title}</h1>
              <div className="hero-meta mb-3">
                {featuredMovie.Rated && featuredMovie.Rated !== "N/A" && (
                  <span className="badge bg-danger me-2">{featuredMovie.Rated}</span>
                )}
                {featuredMovie.Genre && featuredMovie.Genre !== "N/A" && (
                  <span className="genre-badge">{featuredMovie.Genre.split(",")[0]}</span>
                )}
                {featuredMovie.Runtime && featuredMovie.Runtime !== "N/A" && (
                  <span className="duration-text">{featuredMovie.Runtime}</span>
                )}
              </div>

              {featuredMovie.imdbRating && featuredMovie.imdbRating !== "N/A" && (
                <div className="rating-display mb-3">
                  <span className="imdb-rating">⭐ {featuredMovie.imdbRating}</span>
                </div>
              )}

              {featuredMovie.Plot && featuredMovie.Plot !== "N/A" && (
                <p className="hero-plot mb-4">{featuredMovie.Plot}</p>
              )}
              
              <div className="hero-buttons">
                <button
                  className="btn btn-danger btn-lg me-2"
                  onClick={() => navigate(`/movie/${featuredMovie.imdbID}`)}
                >
                  Book Now
                </button>
                <button className="btn btn-outline-light btn-lg">Watch Trailer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

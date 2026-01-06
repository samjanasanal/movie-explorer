import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=c4aac30&i=${id}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Movie Details:", data)
        setMovie(data)
      })
      .catch((err) => console.error("Error fetching movie:", err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">Movie not found.</p>
        <button className="btn btn-outline-danger mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    )
  }

  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "/movie-poster.jpg"

  const renderStarRating = (rating) => {
    const numRating = Number.parseFloat(rating)
    const fullStars = Math.floor(numRating / 2)
    const hasHalfStar = numRating % 2 >= 1
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="star-rating">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span key={`full-${i}`} className="star full">
              ★
            </span>
          ))}
        {hasHalfStar && <span className="star half">★</span>}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
              ★
            </span>
          ))}
        <span className="rating-text ms-2">{numRating}/10</span>
      </div>
    )
  }

  return (
    <div className="details-page">
      <div
        className="details-hero"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${posterUrl})` }}
      >
        <div className="container details-content">
          <div className="row align-items-end">
            <div className="col-md-3 mb-4 mb-md-0">
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.Title}
                className="movie-poster-detail img-fluid rounded"
              />
            </div>
            <div className="col-md-9 ps-md-4">
              <div className="movie-info">
                <h1 className="movie-title">{movie.Title}</h1>
                <div className="movie-meta mb-3">
                  <span className="badge bg-danger me-2">{movie.Year}</span>
                  {movie.Rated !== "N/A" && <span className="badge bg-secondary me-2">{movie.Rated}</span>}
                  {movie.Runtime !== "N/A" && <span className="badge bg-secondary">{movie.Runtime}</span>}
                </div>

                {movie.imdbRating !== "N/A" && (
                  <div className="rating-section mb-3">
                    <span className="rating-label">IMDb Rating</span>
                    {renderStarRating(movie.imdbRating)}
                  </div>
                )}

                {movie.Genre !== "N/A" && (
                  <p className="movie-detail">
                    <strong>Genre:</strong> {movie.Genre}
                  </p>
                )}

                {movie.Director !== "N/A" && (
                  <p className="movie-detail">
                    <strong>Director:</strong> {movie.Director}
                  </p>
                )}

                {movie.Writer !== "N/A" && (
                  <p className="movie-detail">
                    <strong>Writers:</strong> {movie.Writer}
                  </p>
                )}

                {movie.Actors !== "N/A" && (
                  <p className="movie-detail">
                    <strong>Cast:</strong> {movie.Actors}
                  </p>
                )}

                <button className="btn btn-danger btn-lg btn-book">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container details-about-section">
        {movie.Plot !== "N/A" && (
          <div className="plot-section mt-4 mb-4">
            <h4>About The Movie</h4>
            <p className="movie-plot">{movie.Plot}</p>
          </div>
        )}
      </div>
      <div className="container mt-2 mb-5">
        <button className="btn btn-outline-danger mb-4" onClick={() => navigate("/")}>
          ← Back to Movies
        </button>
      </div>
    </div>
  )
}

export default MovieDetails

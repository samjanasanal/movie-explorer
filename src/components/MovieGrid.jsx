import { useNavigate } from "react-router-dom"

function MovieGrid({ movies }) {
  const navigate = useNavigate()

  return (
    <div className="movie-grid">
      <div className="row g-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="col-lg-3 col-md-4 col-sm-6"
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="movie-card">
              <div className="movie-card-image">
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg?height=300&width=200&query=movie-poster"
                  }
                  alt={movie.Title}
                  className="img-fluid"
                />
                <div className="movie-card-overlay">
                  <button className="btn btn-danger btn-sm">View Details</button>
                </div>
              </div>
              <div className="movie-card-info">
                <h5 className="movie-card-title">{movie.Title}</h5>
                <p className="movie-card-year">{movie.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieGrid

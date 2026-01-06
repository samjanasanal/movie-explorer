import React, { useContext } from "react"
import { SimpleContext } from "../services/Context"
import HeroSection from "../components/HeroSection"
import MovieGrid from "../components/MovieGrid"
import Pagination from "../components/Pagination"

function Home() {
  const { movies, loading } = useContext(SimpleContext)

  return (
    <>
      <HeroSection />

      <section className="container-fluid movies-section">
        <div className="container">
          <h3 className="mb-4 section-title">Search Results</h3>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading movies...</p>
            </div>
          ) : movies?.length > 0 ? (
            <>
              <MovieGrid movies={movies} />
              <Pagination />
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No movies found. Try another search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Home

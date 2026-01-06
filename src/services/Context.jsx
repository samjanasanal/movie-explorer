import { createContext, useEffect, useState } from "react"

export const SimpleContext = createContext()

export const ContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("avengers")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [featuredMovie, setFeaturedMovie] = useState(null)

  const fetchMovies = (query, page = 1) => {
    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=c4aac30&s=${query}&page=${page}&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data)
        setMovies(data?.Search || [])
        const total = Number.parseInt(data?.totalResults || 0)
        setTotalPages(Math.ceil(total / 10))
        if (data?.Search && data.Search.length > 0) {
          fetchMovieDetails(data.Search[0].imdbID, true)
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err)
        setMovies([])
      })
      .finally(() => setLoading(false))
  }

  const fetchMovieDetails = (imdbID, isFeatured = false) => {
    fetch(`https://www.omdbapi.com/?apikey=c4aac30&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        if (isFeatured) {
          setFeaturedMovie(data)
        }
      })
      .catch((err) => console.error("Error fetching movie details:", err))
  }

  useEffect(() => {
    fetchMovies(searchQuery, currentPage)
  }, [searchQuery, currentPage])

  return (
    <SimpleContext.Provider
      value={{
        movies,
        setMovies,
        loading,
        setLoading,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        featuredMovie,
        setFeaturedMovie,
        fetchMovieDetails,
      }}
    >
      {children}
    </SimpleContext.Provider>
  )
}

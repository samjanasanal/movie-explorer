import React, { useContext } from "react"
import { SimpleContext } from "../services/Context"

function Pagination() {
  const { currentPage, setCurrentPage, totalPages } = useContext(SimpleContext)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="pagination-container mt-5 mb-5">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
              ← Previous
            </button>
          </li>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else {
              const start = Math.max(1, currentPage - 2)
              pageNum = start + i
              if (pageNum > totalPages) pageNum = totalPages - (4 - i)
            }
            return pageNum >= 1 && pageNum <= totalPages ? (
              <li key={pageNum} className={`page-item ${currentPage === pageNum ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(pageNum)}>
                  {pageNum}
                </button>
              </li>
            ) : null
          })}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
              Next →
            </button>
          </li>
        </ul>
      </nav>
      <p className="text-center text-muted mt-3">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}

export default Pagination

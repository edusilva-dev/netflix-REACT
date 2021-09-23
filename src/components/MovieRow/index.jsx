import React, { useState } from 'react'
import './MovieRow.scss'

import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'

// eslint-disable-next-line
export default ({title, items}) => {
  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2)
    if (x > 0) {
      x = 0
    }

    setScrollX(x)
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2)
    let listWidth = items.results.length * 150
    if ((window.innerWidth - listWidth) > x) {
      x = window.innerWidth - listWidth - 60
    }
    setScrollX(x)
  }

  return (
    <div className="movie_row">
      <h2 className="movie_row__title">{title}</h2>

      <div className="movie_row__arrow movie_row__arrow__left" onClick={handleLeftArrow}>
        <NavigateBefore style={{fontSize: 50}} />
      </div>

      <div className="movie_row__arrow movie_row__arrow__right" onClick={handleRightArrow}>
        <NavigateNext style={{fontSize: 50}} />
      </div>

      <div className="movie_row__list_area">
        <div className="movie_row__list" style={{ marginLeft: scrollX, width: items.results.length * 150 }}>
          {items.results.length > 0 && items.results.map((movie, key) => (
            <div key={key} className="movie_row__item">
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className="movie_row__item__image" alt={movie.original_title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import './FeaturedMovie.scss'

// eslint-disable-next-line
export default ({item}) => {
  const date = new Date(item.first_air_date)
  const genres = []
  for (const genre of item.genres) {
    genres.push(genre.name)
  }

  let description = item.overview
  if (description.length > 200) description = `${description.substring(0, 200)}...`

  return (
    <section className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className="featured__vertical">
        <div className="featured__horizontal">
          <h2 className="featured__name">{item.original_name}</h2>

          <div className="featured__infos">
            <div className="featured__infos__points">{item.vote_average.toString().replace('.', '')}% gostaram</div>
            <div className="featured__infos__year">{date.getFullYear()}</div>
            <div className="featured__infos__seasons">{item.number_of_seasons} tempoarada{item.number_of_seasons > 1 ? 's' : ''}</div>
          </div>

          <p className="featured__description">{description}</p>

          <div className="featured__buttons">
            <a href={`/watch/${item.id}`} className="featured__buttons__button featured__buttons__button--watch">► Assistir</a>
            <a href={`/list/add/${item.id}`} className="featured__buttons__button featured__buttons__button--add">+ Minha Lista</a>
          </div>

          <div className="featured__genres">
            <strong>Gêneros:</strong>
            &nbsp;{genres.join(', ')}
          </div>
        </div>
      </div>
    </section>
  )
}
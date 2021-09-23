import React, { useEffect, useState } from 'react'
import Tmdb from '../services/Tmdb'

import '../styles/Home.scss'

import MovieRow from '../components/MovieRow'
import FeaturedMovie from '../components/FeaturedMovie'

// eslint-disable-next-line
export default () => {
  const [moviesList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList()
      setMovieList(list)

      const originals = list.filter(item => item.slug === "originals")
      const randomFeaturedIndex = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      const featuredChoosen = originals[0].items.results[randomFeaturedIndex]
      const featuredChoosenInfo = await Tmdb.getMovieInfo(featuredChoosen.id, 'tv')
      setFeaturedData(featuredChoosenInfo)
    }

    loadAll()
  }, [])

  return (
    <main className="page">
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {moviesList.map((movie, key) => (
          <MovieRow key={key} title={movie.title} items={movie.items} />
        ))}
      </section>

      {moviesList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading" />
        </div>
      }
    </main>
  );
}
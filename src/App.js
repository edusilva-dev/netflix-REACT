import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'

import './styles/reset.scss'
import './styles/home.scss'

import Header from './components/Header'
import Footer from './components/Footer'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

// eslint-disable-next-line
export default () => {
  const [moviesList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
        return
      }

      setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {moviesList.map((movie, key) => (
          <MovieRow key={key} title={movie.title} items={movie.items} />
        ))}
      </section>

      <Footer />

      {moviesList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading" />
        </div>
      }
    </div>
  );
}
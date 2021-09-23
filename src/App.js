import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/reset.scss'

import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'

// eslint-disable-next-line
export default () => {
  const [blackHeader, setBlackHeader] = useState(false)

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
    <BrowserRouter>
      <Header black={blackHeader} />
      
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}
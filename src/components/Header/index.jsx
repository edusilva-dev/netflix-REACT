import React from 'react'
import './Header.scss'

// eslint-disable-next-line
export default ({black}) => {
  return (
    <header className={`header${black ? ' black' : ''}`}>
      <div className="header__logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="header__logo__image" alt="Logo Netflix" />
        </a>
      </div>

      <div className="header__user">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="header__user__image" alt="Logo do usuário" />
        </a>
      </div>
    </header>
  )
}
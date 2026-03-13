import React from 'react'
import './Header.css'

const Header = () => {
  const handleViewMenuClick = () => {
    const menuSection = document.getElementById('explore-menu')
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Discover delicious meals from your favorite restaurants, freshly prepared and delivered straight to your doorstep..</p>
            <button type="button" onClick={handleViewMenuClick}>View Menu</button>
        </div>
    </div>
  )
}

export default Header
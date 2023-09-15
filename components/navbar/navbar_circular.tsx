'use client'

import './css/navbar_circular.css'

import React, { useState } from 'react'

type props = {
  navoption: navProps[]
}

type navProps = {
  name: string
  href: string
  Classes: string | undefined
}

const circleClasses: string[] = [
  'circle-one',
  'circle-two',
  'circle-three',
  'circle-five',
]

const Navbar: React.FC<props> = ({ navoption }) => {
  const [isActive, setIsActive] = useState(false)
  for (let i = 0; i < navoption.length; i++) {
    navoption[i].Classes = circleClasses[i]
  }

  return (
    <div>
      {/* Hamburger Icon */}
      <div
        className={`bars ${isActive ? 'active' : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        <span className='bar'></span>
      </div>

      {/* Navbar Links */}
      <nav id='nav' className={isActive ? 'visible' : ''}>
        <ul>
          {navoption.map((nav, index) => (
            <li key={index} className={`shape-circle ${nav.Classes}`}>
              <a href={nav.href} className='text-[16px] font-bold'>
                {nav.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

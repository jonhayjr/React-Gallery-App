import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
    <ul>
      <li><NavLink to='/search/flowers'>Flowers</NavLink></li>
      <li><NavLink to='/search/sunsets'>Sunsets</NavLink></li>
      <li><NavLink to='/search/beaches'>Beaches</NavLink></li>
    </ul>
  </nav>
)

export default Nav;
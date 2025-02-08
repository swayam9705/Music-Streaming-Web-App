import React from 'react';
import "./Navbar.css";

import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.svg"

const Navbar = () => {
    return (
        <nav class="Navbar">
            <img className='Navbar__logo' src={Logo} alt="logo" />
            <div className="Navbar__search-bar">
                <input
                    placeholder='Search...'
                    className='Navbar__search-input' type="text" name="query" id="query" />
                <button className='Navbar__search-btn'>
                    <SearchIcon />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
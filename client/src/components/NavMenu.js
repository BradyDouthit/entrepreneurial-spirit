import React from 'react';
import Navbar from './Navbar';

function NavMenu (props) {
    return (

        <div style={{ zIndex: props.style.zIndex, color: 'white' }} id="nav-menu">
            <Navbar />
            <a>Test</a>
            <a>Test</a>
            <a>Test</a>
            <a>Test</a>
            <a>Test</a>
            <a>Test</a>
        </div>
    );
}

export default NavMenu;
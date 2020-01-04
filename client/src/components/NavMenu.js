import React from 'react';
import Navbar from './Navbar';

function NavMenu(props) {
    return (
        <div style={{zIndex: props.style.zIndex}} id="nav-menu">
            <a href="#">Test</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
            <a href="#">Test</a>
        </div>
    );
}

export default NavMenu;
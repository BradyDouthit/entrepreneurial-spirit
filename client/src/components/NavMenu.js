import React from 'react';

//renders navigation links -- not yet implemented
function NavMenu(props) {
    return (
        <div style={{ zIndex: props.style.zIndex }} id="nav-menu">
            <ul>
                <li><a href="/">Test</a></li>
                <li><a href="/">Test</a></li>
                <li><a href="/">Test</a></li>
                <li><a href="/">Test</a></li>
                <li><a href="/">Test</a></li>
            </ul>
        </div>
    );
}

export default NavMenu;
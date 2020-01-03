import React from 'react';

function NavMenu (props) {
    console.log(props.zIndex)
    return (
        <div style={{zIndex: props.zIndex}} id="nav-menu">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default NavMenu;
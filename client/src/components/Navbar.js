import React from 'react';
import NavMenu from '../components/NavMenu'
import NavbarOpenClose from './NavbarOpenClose';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <header id="navbar">
                    <NavbarOpenClose style={this.navStyles} setNavState={this.props.setNavState} />
                    <div>Logo</div>
                    {/* <i className="fas fa-chart-line fa-lg"></i> */}
                    <a id="get-started">Get Started</a>
                </header>
            </div>

        );
    }
}

export default Navbar;
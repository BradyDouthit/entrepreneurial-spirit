import React from 'react';
import NavMenu from '../components/NavMenu'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        navbarzIndex: 0.3
    }

    setNavzIndex = (zIndex) => {
        this.setState({ navbarzIndex: zIndex })
    }

    render() {
        return (
            <div>
                <header id="navbar">
                    <i onClick={() => this.setNavzIndex(0)} className="fas fa-bars fa-lg"></i>
                    <div>Logo</div>
                    {/* <i className="fas fa-chart-line fa-lg"></i> */}
                    <a id="get-started">Get Started</a>
                </header>
                <NavMenu zIndex={this.state.navbarzIndex} />
            </div>
    
        );
    }
}

export default Navbar;
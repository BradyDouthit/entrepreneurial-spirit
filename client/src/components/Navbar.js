import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <header id="navbar">
                    {this.props.isNavOpen ? 
                    <i onClick={() => this.props.playNavAnimation(false)} className="cursor-pointer fas fa-times fa-lg"></i>: 
                    <i onClick={() => this.props.playNavAnimation(true)} className="cursor-pointer fas fa-bars fa-lg"></i>}
                    <div>Logo</div>
                    {/* <i className="fas fa-chart-line fa-lg"></i> */}
                    <a id="get-started">Get Started</a>
                </header>
            </div>

        );
    }
}

export default Navbar;
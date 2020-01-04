import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <header id="navbar">
                    <i onClick={() => this.props.playNavAnimation()} className="fas fa-bars fa-lg"></i>
                    <div>Logo</div>
                    {/* <i className="fas fa-chart-line fa-lg"></i> */}
                    <a id="get-started">Get Started</a>
                </header>
            </div>

        );
    }
}

export default Navbar;
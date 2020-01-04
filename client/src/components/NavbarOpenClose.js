import React from 'react';

class NavbarOpenClose extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {

    }

    render() {
        console.log(this.props.style)
        return (
            <i onClick={() => this.props.setNavState(true)} className="fas fa-bars fa-lg"></i>
        );
    }
};

export default NavbarOpenClose;
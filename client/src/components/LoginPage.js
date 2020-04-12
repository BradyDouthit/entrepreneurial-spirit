import React from 'react';
import Navbar from './Navbar';
import NavMenu from '../components/NavMenu';
import anime from 'animejs';
import GetStartedButton from './GetStartedButton';


class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    };

    state = {
        navStyles: {
            zIndex: -1
        },
        isNavOpen: false,
    }
    //handle nav menu animations
    playNavAnimation = (openState) => {
        this.setState({
            navStyles: {
                zIndex: 1
            },
            isNavOpen: openState
        })
        if (openState) {
            //slide nav menu down
            anime({
                targets: "#nav-menu",
                translateY: '100vh',
                translateX: '100vw',
                opacity: 1,
                easing: 'easeInOutSine',
                duration: 300
            }).play();
            //change color of navbar to match background
            anime({
                targets: "#navbar",
                backgroundColor: 'rgb(41, 41, 41)',
                easing: 'linear',
                duration: 300
            }).play();
        }
        else if (!openState) {
            //slide nav menu up
            anime({
                targets: "#nav-menu",
                translateY: '-100vh',
                translateX: '-100vw',
                easing: 'easeInOutSine',
                duration: 300
            }).play();
            //change color of navbar to match background
            anime({
                targets: "#navbar",
                backgroundColor: 'rgba(40, 255, 0, 0.3)',
                easing: 'linear',
                duration: 300
            }).play();
        }
    }

    render() {
        return (
            <div className='' id="login-page">
                <NavMenu loggedIn={this.props.loggedIn} style={this.state.navStyles} />
                <div id="login-grid">
                    <Navbar isNavOpen={this.state.isNavOpen} playNavAnimation={this.playNavAnimation} />
                    <div id="welcome-message">
                        <h1>Learn to invest at no cost</h1>
                        <p>Real stock prices, no risk.</p>
                    </div>
                    <div id="login-page-button-wrapper">
                        <GetStartedButton setMoney={this.props.setMoney}logIn={this.props.logIn} />
                    </div>
                </div>
            </div>
        );
    }
};

export default LoginPage;
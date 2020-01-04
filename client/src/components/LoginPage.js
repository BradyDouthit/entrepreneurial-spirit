import React from 'react';
import GoogleLogin from 'react-google-login';
import Navbar from './Navbar';
import NavMenu from '../components/NavMenu';
import anime from 'animejs';


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

    responseGoogle = (response) => {
        if (response.error) {
            console.log('could not log in: ' + response.error)
        }
        else {
            let profile = response.profileObj;
            console.log(response);
            this.props.logIn(true, profile);
        }
    }

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
            //slid nav menu up
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
                <NavMenu style={this.state.navStyles} />
                <div id="login-grid">
                    <Navbar isNavOpen={this.state.isNavOpen} playNavAnimation={this.playNavAnimation} />
                    <div id="welcome-message">
                        <h1>Learn to invest at no cost</h1>
                        <p>Real stock prices, no risk.</p>
                    </div>
                    <div id="google-button">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default LoginPage;
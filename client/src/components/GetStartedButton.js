import React from 'react';
import Modal from 'react-responsive-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class GetStartedButton extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        open: false,
        usernameValue: '',
        passwordValue: ''
    }

    signUpGoogleResponse = (response) => {
        if (response.error) {
            console.log('could not log in: ' + response.error)
        }
        else {
            let profile = response.profileObj;
            axios.post('/api/user/google/signup', {
                googleID: profile.googleId,
                username: this.state.usernameValue,
                email: profile.email,
                firstName: profile.givenName,
                lastName: profile.familyName,
                password: this.state.passwordValue
            }).then(postResponse => {
                console.log(postResponse)
                this.props.logIn(true, profile);
            })
        }
    }

    signInGoogleResponse = (response) => {
        if (response.error) {
            console.log('could not sign up: ' + response.error)
        }
        else {
            let googleId = response.profileObj.googleId;
            axios.post('/api/user/google/login', {
                googleID: googleId
            }).then(postResponse => {
                console.log(postResponse)
            })
        }
    }

    handleChange = (event) => {
        console.log(event.target)
        if (event.target.name === "username") {
            this.setState({ usernameValue: event.target.value });
        }
        else if (event.target.name === "password") {
            this.setState({ passwordValue: event.target.value })
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div className="modal-button-wrapper">
                <button onClick={this.onOpenModal} className="modal-button">Get Started</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div id="modal-content">
                        <h2>Login With:</h2>
                        <div id="google-button">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Login"
                                onSuccess={this.signInGoogleResponse}
                                onFailure={this.signInGoogleResponse}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <h2>Or Sign up with:</h2>
                        <label>Username: </label>
                        <input
                            onChange={this.handleChange}
                            value={this.state.usernameValue}
                            id="signup-username"
                            type="text"
                            name="username"
                            placeholder="username"></input>
                        <label>Password: </label>
                        {/* add a min length to password with minlength */}
                        <input
                            onChange={this.handleChange}
                            value={this.state.passwordValue}
                            id="signup-pw" type="password"
                            name="password"
                            placeholder="password"></input>
                        <div id="google-button">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Sign Up"
                                onSuccess={this.signUpGoogleResponse}
                                onFailure={this.signUpGoogleResponse}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default GetStartedButton;
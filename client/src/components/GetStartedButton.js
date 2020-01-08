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
            console.log('could not sign up: ' + response.error);
        }
        else {
            let googleProfile = response.profileObj;
            axios.post('/api/user/google/signup', {
                googleID: googleProfile.googleId,
                username: this.state.usernameValue,
                email: googleProfile.email,
                firstName: googleProfile.givenName,
                lastName: googleProfile.familyName,
                password: this.state.passwordValue
            }).then(postResponse => {
                console.log(postResponse)
                if (postResponse.data.errmsg) {
                    console.log("error: " + postResponse.data.errmsg)
                }
                else {
                    let profile = {
                        username: postResponse.data.username,
                        email: postResponse.data.email,
                        firstName: postResponse.data.firstName,
                        lastName: postResponse.data.lastName
                    };

                    this.props.logIn(true, profile);
                }
            })
        }
    }

    signInGoogleResponse = (response) => {
        if (response.error) {
            console.log('could not log in: ' + response.error)
        }
        else {
            let googleId = response.profileObj.googleId;
            axios.post('/api/user/google/login', {
                googleID: googleId
            }).then(postResponse => {
                if (postResponse.data.error) {
                    console.log('could not log in: ' + postResponse.data.error)
                }
                else {
                    let profile = {
                        username: postResponse.data.username,
                        email: postResponse.data.email,
                        firstName: postResponse.data.firstName,
                        lastName: postResponse.data.lastName
                    }
                    this.props.logIn(true, profile);
                }
            })
        }
    }

    handleChange = (event) => {
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
                        <form>
                            <label>Password: </label>
                            {/* add a min length to password with minlength */}
                            <input
                                onChange={this.handleChange}
                                value={this.state.passwordValue}
                                id="signup-pw" type="password"
                                name="password"
                                placeholder="password"></input>
                        </form>
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
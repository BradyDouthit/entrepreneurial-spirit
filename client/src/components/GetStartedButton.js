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
        passwordValue: '',
        logInError: false
    }
    //called by the Google sign up button
    signUpGoogleResponse = (response) => {
        if (response.error) {
            console.log('could not sign up: ' + response.error);
        }
        else {
            //if no error, proceed sending profile to the back end
            let googleProfile = response.profileObj;
            axios.post('/api/user/google/signup', {
                googleID: googleProfile.googleId,
                username: this.state.usernameValue,
                email: googleProfile.email,
                firstName: googleProfile.givenName,
                lastName: googleProfile.familyName,
                password: this.state.passwordValue
            }).then(postResponse => {
                console.log(postResponse);
                if (postResponse.data.errmsg) {
                    console.log("error: " + postResponse.data.errmsg);
                }
                else {
                    //new user, so give $10000 to start with
                    let profile = {
                        username: postResponse.data.username,
                        email: postResponse.data.email,
                        firstName: postResponse.data.firstName,
                        lastName: postResponse.data.lastName,
                        money: 10000
                    };
                    //these methods are passed down from App.js
                    this.props.setMoney(profile.money);
                    this.props.logIn(true, profile);
                }
            })
        }
    }

    signInGoogleResponse = (response) => {
        if (response.error) {
            console.log('could not log in: ' + response.error)
        }
        //if no error, continue to sign in
        else {
            let googleId = response.profileObj.googleId;
            axios.post('/api/user/google/login', {
                googleID: googleId
            }).then(postResponse => {
                if (postResponse.data.error) {
                    console.log('could not log in: ' + postResponse.data.error);
                    this.setState({ logInError: true });
                }
                //if no error from the server, log in with server response
                else {
                    let profile = {
                        _id: postResponse.data._id,
                        googleID: postResponse.data.googleID,
                        email: postResponse.data.email,
                        username: postResponse.data.username,
                        email: postResponse.data.email,
                        firstName: postResponse.data.firstName,
                        lastName: postResponse.data.lastName,
                        money: postResponse.data.money,
                        purchases: postResponse.data.purchases
                    }
                    console.log("Setting profle...");
                    console.log(profile.money)
                    //methods passed down from App.js
                    this.props.logIn(true, profile);
                    this.props.setMoney(profile.money)
                }
            })
        }
    }

    //handle typing in sign-up fields
    handleChange = (event) => {
        if (event.target.name === "username") {
            this.setState({ usernameValue: event.target.value });
        }
        else if (event.target.name === "password") {
            this.setState({ passwordValue: event.target.value })
        }
    }

    //open modal
    onOpenModal = () => {
        this.setState({ open: true });
    };

    //close modal
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
                        {this.state.logInError ? <div style={{color: "red"}}>Could not log in (do you have an account?)</div> : <></>}
                        <h2>Or Sign up with:</h2>
                        <form>
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
                                id="signup-pw"
                                type="password"
                                name="password"
                                autoComplete="on"
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
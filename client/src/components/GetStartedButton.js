import React from 'react';
import Modal from 'react-responsive-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class GetStartedButton extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        open: false
    }

    responseGoogle = (response) => {
        if (response.error) {
            console.log('could not log in: ' + response.error)
        }
        else {
            let profile = response.profileObj;
            axios.post('/api/user/google/signup', {
                googleID: profile.googleId,
                email: profile.email,
                firstName: profile.givenName,
                lastName: profile.familyName,
                password: 'test'
            }).then(postResponse => {
                console.log(postResponse)
                this.props.logIn(true, profile);
            })
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
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <h2>Or Sign up with:</h2>
                        <p>Username:</p>
                        <input id="signup-username" type="text" placeholder="username"></input>
                        <p>Password:</p>
                        <input id="signup-pw" type="text" placeholder="password"></input>
                        <div id="google-button">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Sign Up"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
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
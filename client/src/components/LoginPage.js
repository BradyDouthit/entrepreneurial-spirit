import React from 'react';
import GoogleLogin from 'react-google-login';
import Navbar from './Navbar';

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    };
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

    getUserInfo = () => {

    }

    render() {
        return (
            <div className='' id="login-page">
                <div id="login-grid">
                    <Navbar />
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
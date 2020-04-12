import React from 'react';
import Modal from 'react-responsive-modal';

class ViewProfileButton extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        open: false,
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
        console.log(this.props.profile)
        const { open } = this.state;
        return (
            <div className="modal-button-wrapper">
                <button onClick={this.onOpenModal} id="view-profile-button" className="modal-button">View Profile</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div id="profile-modal">
                        <h2>{this.props.profile.firstName} {this.props.profile.lastName}</h2>
                        <div>Email: {this.props.profile.email}</div>
                        <br></br>
                        <div>Username: {this.props.profile.username}</div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default ViewProfileButton;
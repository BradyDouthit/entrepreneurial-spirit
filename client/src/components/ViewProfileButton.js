import React from 'react';
import Modal from 'react-responsive-modal';

class ViewProfileButton extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        open: false,
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
                <button onClick={this.onOpenModal} id="view-profile-button" className="modal-button">View Profile</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div id="modal-content">
                        <h2>{this.props.profile.firstName} {this.props.profile.lastName}</h2>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default ViewProfileButton;
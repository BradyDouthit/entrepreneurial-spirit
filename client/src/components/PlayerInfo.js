import React from 'react';
import ViewProfileButton from './ViewProfileButton';

function PlayerInfo(props) {
    return (
        <div id="player-info">
            <h2>Welcome {props.profile.firstName}!</h2>
            <ViewProfileButton profile={props.profile} />
            <h3>Your money:</h3>
            <h1 id="player-money">${props.money}</h1>
        </div>
    );
};

export default PlayerInfo;
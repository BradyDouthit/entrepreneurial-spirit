import React from 'react';

function PlayerInfo(props) {
    return (
        <div id="player-info">
            <h2>Welcome, {props.profile.username}</h2>
            <h3>Your money:</h3>
            <h1 id="player-money">${props.money}</h1>
        </div>
    );
};

export default PlayerInfo;
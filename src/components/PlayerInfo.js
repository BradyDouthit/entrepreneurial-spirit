import React from 'react';

function PlayerInfo(props) {
    console.log(props.ownedItems)
    return (
        <div id="player-info">
            <h3>Your money:</h3>
            <h1 id="player-money">${props.money}</h1>
        </div>
    );
};

export default PlayerInfo;
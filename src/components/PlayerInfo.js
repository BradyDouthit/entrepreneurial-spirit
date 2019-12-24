import React from 'react';

function PlayerInfo(props) {
    return (
        <div id="player-info">
            <div id="player-money">${props.money}</div>
        </div>
    );
};

export default PlayerInfo;
import React from 'react';

function Item(props) {
    return (
        <div className="item-wrapper">
            <div className="item-name">{props.name}</div>
            <div className="item-price">${props.price}</div>
            <button onClick={() => props.buyItem(props.price, props.name, props.itemID)} className="buy-item">Buy {props.name}</button>
        </div>
    );
}

export default Item;
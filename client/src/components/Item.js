import React from 'react';

//for each item mapped in StocksPage.js, render the corresponding info
function Item(props) {
    return (
        <div className="item-wrapper">
            <div className="item-name">{props.symbol}</div>
            <div className="item-price">${props.price}</div>
            <button onClick={() => props.buyItem(props.price, props.name, props.itemID)} className="buy-item">Buy {props.symbol}</button>
        </div>
    );
}

export default Item;
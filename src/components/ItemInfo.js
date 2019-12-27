import React from 'react';

function ItemInfo(props) {
    return (
        <div id="item-info-container">
            {props.itemList.map(item =>
                <div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price}</div>
                </div>
            )}
        </div>
    );
}

export default ItemInfo;
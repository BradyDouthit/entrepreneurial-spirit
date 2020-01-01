import React from 'react';
import PlayerInfo from './PlayerInfo';
import Item from './Item';
function StocksPage(props) {
    return (
        <div>
            <PlayerInfo ownedItems={props.ownedItems} money={props.money} />
            {props.ItemList.map(item =>
                <Item
                    itemID={item.symbol}
                    key={item.id}
                    buyItem={props.buyItem}
                    price={item.latestPrices['4. close'] === undefined ? item.latestPrices['4b. close (USD)'] : item.latestPrices['4. close']}
                    symbol={item.symbol} />
            )}
            <button onClick={props.getStocksData}>Open the Stock Market!</button>
        </div>
    )
};

export default StocksPage;
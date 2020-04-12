import React from 'react';
import PlayerInfo from './PlayerInfo';
import Item from './Item';

//use props passed from App.js to render components and map available items
function StocksPage(props) {
    return (
        <div id="stocks-page">
            <PlayerInfo profile={props.profile} ownedItems={props.ownedItems} money={props.money} />
            {props.ItemList.length ?
                props.ItemList.map(item =>
                    <Item
                        itemID={item.symbol}
                        key={item.id}
                        buyItem={props.buyItem}
                        price={item.latestPrices['4. close'] === undefined ? item.latestPrices['4b. close (USD)'] : item.latestPrices['4. close']}
                        symbol={item.symbol} />
                )
            : <div>No data yet!</div>}
            <button onClick={props.getStocksData}>Open the Stock Market!</button>
        </div>
    )
};

export default StocksPage;
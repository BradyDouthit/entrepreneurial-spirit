import React from 'react';
import './App.css';
import Item from './components/Item';
import ItemList from './ItemList.json';
import PlayerInfo from './components/PlayerInfo';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.buyItem = this.buyItem.bind(this);
  }
  state = {
    ItemList,
    money: 500,
    ownedItems: []
  }

  componentDidMount() {

  }

  buyItem = (itemPrice, itemName, itemID) => {
    let currentMoney = this.state.money;
    if (currentMoney > itemPrice) {

      let boughtItem = {
        id: itemID,
        name: itemName,
        price: itemPrice,
        quantity: 1
      };

      currentMoney = currentMoney - itemPrice;
      let roundedMoney = Math.round(100 * currentMoney) / 100;
      this.setState({ money: roundedMoney });
    }
  }

  render() {
    return (
      <div className="App">
        <PlayerInfo ownedItems={this.state.ownedItems} money={this.state.money} />
        {this.state.ItemList.map(item =>
          <Item
            itemID={item.id}
            key={item.id}
            buyItem={this.buyItem}
            price={item.price}
            name={item.name} />
        )}
      </div>
    );
  };
}

export default App;

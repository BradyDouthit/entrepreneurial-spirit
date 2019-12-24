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
  }

  buyItem = (itemPrice) => {
    let currentMoney = this.state.money;
    if (currentMoney > itemPrice) {
      currentMoney = currentMoney - itemPrice;
      let roundedMoney = Math.round(100*currentMoney)/100
      this.setState({ money: roundedMoney })
      console.log(this.state.money)
    }
  }

  render() {
    return (
      <div className="App">
        <PlayerInfo money={this.state.money} />
        {this.state.ItemList.map(item => 
          <Item
          key={item.id}
          buyItem={this.buyItem}
          price={item.price}
          quantity={20}
          name={item.name} />
        )}
      </div>
    );
  };
}

export default App;

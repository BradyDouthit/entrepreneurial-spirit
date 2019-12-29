import React from 'react';
import './App.css';
import Item from './components/Item';
import ItemList from './ItemList.json';
import PlayerInfo from './components/PlayerInfo';
import Modal from 'react-responsive-modal';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.buyItem = this.buyItem.bind(this);
  }
  state = {
    ItemList,
    updatedItemList: ItemList,
    money: 500,
    ownedItems: [],
    open: false
  }

  componentDidMount() {
    this.getStocksData();
  }

  openStockMarket = () => {
    setInterval(() => {
      this.getPrices();
    }, 1500)
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getStocksData = () => {
    //get data
    axios.get('/api/stocks').then(data => {
      //map data
      data.data.map(entry => {
        //convert to array and get prices back as an object
        const datesArr = Object.entries(entry.data);
        let latestPrices = datesArr[0][1];
        let oldestPrices = datesArr[datesArr.length - 1][1];
        
        let symbol = entry.symbol;
        let prices = {
          symbol: symbol,
          latestPrices: latestPrices,
          oldestPrices: oldestPrices
        }
        console.log(prices)
        return prices;
      })
    })
  }

  getPrices = () => {
    this.setState({ updatedItemList: ItemList })

    //get a random percentage to multiply the price by
    let randomDecimal = Math.round(100 * Math.random() / 4) / 100;
    console.log(randomDecimal)
    let addOrSubtractDeterminate = Math.round(Math.random());

    //if value is 1, add to the item price
    if (addOrSubtractDeterminate) {
      this.state.updatedItemList.map(item => {
        let roundedPrice = Math.round(100 * ((item.price * randomDecimal) + item.price)) / 100
        //make sure that prices never go negative
        roundedPrice <= 50 ? roundedPrice = 50 : item.price = roundedPrice;
      })
    }
    //if value is 0, subtract from the item price
    else if (!addOrSubtractDeterminate) {
      this.state.updatedItemList.map(item => {
        let roundedPrice = Math.round(100 * (item.price - (item.price * randomDecimal))) / 100
        //make sure that prices never go negative
        roundedPrice <= 50 ? roundedPrice = 50 : item.price = roundedPrice;
      })
    }

  }

  buyItem = (itemPrice, itemName, itemID) => {

    //verify player has enough money
    let currentMoney = this.state.money;
    if (currentMoney > itemPrice) {

      //subtract the amount from players money
      currentMoney = currentMoney - itemPrice;

      //round money to the nearest hundreth and set state
      let roundedMoney = Math.round(100 * currentMoney) / 100;
      this.setState({ money: roundedMoney });

    }
  }

  render() {
    const { open } = this.state;
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
        <button onClick={this.getStocksData}>Open the Stock Market!</button>

        <Modal open={open} onClose={this.onCloseModal} center>
          <PlayerInfo ownedItems={this.state.ownedItems} money={this.state.money} />
        </Modal>
      </div>
    );
  };
}

export default App;

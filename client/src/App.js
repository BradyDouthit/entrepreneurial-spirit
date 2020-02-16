import React from 'react';
import './App.css';
import './css/topographyBackground.css';
import ItemList from './ItemList.json';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import StocksPage from './components/StocksPage';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.buyItem = this.buyItem.bind(this);
  }
  state = {
    ItemList: [],
    updatedItemList: ItemList,
    money: 10000,
    open: false,
    loggedIn: false,
    profile: null
  }

  componentDidMount() {
    this.getStocksData();
  }

  getStocksData = () => {
    let ItemListState = [];
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
          id: entry.id,
          symbol: symbol,
          latestPrices: latestPrices,
          oldestPrices: oldestPrices
        }
        console.log(prices)
        ItemListState.push(prices)
        this.setState({ ItemList: ItemListState })
        return prices;
      })
    })
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

  logIn = (loggedInState, profile) => {
    this.setState({ loggedIn: loggedInState, profile: profile })
  }

  render() {
    return (
      <div className="App t-bg">
        {this.state.loggedIn
          ?
          <StocksPage
            profile={this.state.profile}
            money={this.state.money}
            buyItem={this.buyItem}
            ownedItems={this.state.ownedItems}
            getStocksData={this.getStocksData}
            ItemList={this.state.ItemList} />
          :
          <LoginPage logIn={this.logIn} />
        }
      </div>
    );
  };
}

export default App;

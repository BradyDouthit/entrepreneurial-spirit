import React from 'react';
import './App.css';
import Item from './components/Item';
import PlayerInfo from './components/PlayerInfo';

class App extends React.Component {

  state = {
    money: 500,
  }

  render() {
    return (
      <div className="App">
        <PlayerInfo money={this.state.money} />
        <Item
          price={"5.50"}
          name="20 Apples" />
      </div>
    );
  };
}

export default App;

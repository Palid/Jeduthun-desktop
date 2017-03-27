// @flow
import React, { Component } from 'react'
import ListContainer from './ListContainer'
import PlayerContainer from './PlayerContainer'

class App extends Component {
  render() {
    return (
      <div>
        <PlayerContainer/>
        <ListContainer/>
      </div>
    );
  }
}

export default App

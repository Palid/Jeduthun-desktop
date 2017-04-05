// @flow
import React, { Component } from 'react'
import ListContainer from './ListContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'

class App extends Component {
  render() {
    return (
      <div>
        <PlayerContainer/>
        <PlaylistContainer/>
        <ListContainer/>
      </div>
    );
  }
}

export default App

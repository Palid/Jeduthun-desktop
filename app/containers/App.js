// @flow
import React, { Component } from 'react'
import ListContainer from './ListContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'

class App extends Component {
  render() {
    return (
      <div>
        <div className="main-wrapper__left">
          <ListContainer/>
        </div>
        <div className="main-wrapper__right">
          <PlayerContainer/>
          <PlaylistContainer/>
        </div>
      </div>
    );
  }
}

export default App

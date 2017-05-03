// @flow
import React, { Component } from 'react'
import ListContainer from './ListContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import styles from './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftVisible: false,
      rightVisible: true,
      libraryDir: './library'
    }
    this.toggleSearch = this.toggleSearch.bind(this)
    this.selectFolder = this.selectFolder.bind(this)
  }
  toggleSearch() {
    this.setState({leftVisible: !this.state.leftVisible})
  }
  selectFolder(e) {
    const theFiles = e.target.files;
    const relativePath = theFiles[0].webkitRelativePath;
    console.log('relativePath: ', relativePath)
    const folder = relativePath.split("/");
    console.log('folder: ', folder)
    console.log('folder[0]:', folder[0]);
  }
  render() {
    const wrapperLeftClass = this.state.leftVisible ? styles.mainWrapper__left : styles.mainWrapper__left__hidden
    const wrapperRightClass = this.state.leftVisible ? styles.mainWrapper__right : styles.mainWrapper__right__alone
    const libraryButton = this.state.libraryDir ?
    <button>
      Change library directory
    </button> :
    <button>
      Set library directory
    </button>
    return (
      <div>
        <div className={styles.mainWrapper__sidebar}>
          <button onClick={() => this.toggleSearch()}>
            <svg width="17px" height="16.992px" viewBox="0 0 17 16.992">
              <g>
                <path fill="#cdcbc2" d="M13.275,11.229c0.758-1.145,1.201-2.515,1.201-3.99C14.477,3.24,11.236,0,7.238,0S0,3.24,0,7.238
                  s3.24,7.238,7.238,7.238c1.476,0,2.846-0.443,3.99-1.201l3.717,3.717l2.047-2.047L13.275,11.229z M7.238,11.934
                  c-2.593,0-4.695-2.102-4.695-4.695s2.102-4.695,4.695-4.695c2.594,0,4.695,2.102,4.695,4.695S9.832,11.934,7.238,11.934z"/>
              </g>
            </svg>
          </button>
        </div>
        <div className={wrapperLeftClass}>
          <ListContainer/>
        </div>
        <div className={wrapperRightClass}>
          <PlayerContainer/>
          <PlaylistContainer library={this.state.libraryDir}/>
        </div>
      </div>
    );
  }
}

export default App

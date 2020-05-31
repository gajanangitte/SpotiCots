import React from 'react';
import './App.css';

import {SearchBar} from "../SearchBar/SearchBar"
import {SearchResults} from "../SearchResults/SearchResults"
import {Playlist} from "../Playlist/Playlist"


class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = { 
      searchResults : [
            { 
            name: 'name1',
            artist: 'artist1',
            album: 'album1',
            id: 1,
            }, 
            { 
              name: 'name2',
              artist: 'artist2',
              album: 'album2',
              id: 2,
            },
            { 
                name: 'name3',
                artist: 'artist3',
                album: 'album3',
                id: 3,
            },
      ],
      playlistName : "New Playlist",
      playlistTracks: [ 
            { 
              name: 'name4',
              artist: 'artist4',
              album: 'album4',
              id: 4,
            },
            { 
            name: 'name0',
            artist: 'artist0',
            album: 'album0',
            id: 0,
            },
      ],

    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    
    tracks = tracks.filter( currentTrack => currentTrack.id !== track.id )

    this.setState({playlistTracks: tracks}); 

  }

  updatePlayListName(name) {

    this.setState({playlistName : name});

  }

  render() {
      return (
          <div>
            <h1> <img src="./logo.png" alt="logo" />Spoti<span className="highlight">Cots</span></h1>
            <div className="App">
              <SearchBar />
              <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlayListName}/>
              </div>
            </div>
          </div>
      );
    }
}

export default App;

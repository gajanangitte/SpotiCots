import React from 'react';
import './App.css';


import {SearchBar} from "../SearchBar/SearchBar"
import {SearchResults} from "../SearchResults/SearchResults"
import {Playlist} from "../Playlist/Playlist"

import Spotify from "../../utils/Spotify";

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = { 
      searchResults : [ ],
      playlistName : "New Playlist",
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  savePlaylist() {
    let TrackURIs = this.state.playlistTracks.map( track => track.uri );
    Spotify.savePlaylist(this.state.playlistName, TrackURIs).then(() => {
      alert('Playlist Created')
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      })
    })
  }

  search(term, type) {
    if(Spotify.search(term, type))
    {
        Spotify.search(term, type).then( searchResults => {
          
          this.setState({searchResults : searchResults});
          
        });
        console.log(term);
    }
  }

  render() {
      return (
          <div>
            <h1> <img src="./logo.png" alt="logo" />Spoti<span className="highlight">Cots</span></h1>
            <div className="App">
              <SearchBar 
                onSearch={this.search}/>
              <div className="App-playlist">
              <SearchResults 
                searchResults={this.state.searchResults}
                onAdd={this.addTrack} />
              <Playlist 
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlayListName}
                onSave={this.savePlaylist}
                />
              </div>
            </div>
          </div>
      );
    }
}

export default App;

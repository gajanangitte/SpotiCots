import React from 'react';
import './TrackList.css'

import Track from '../Track/Track.js'

export default class TrackList extends React.Component {
    render() {
       
       if(this.props.tracks){
       return ( <div className="TrackList">  
       {
           
           this.props.tracks.map( (track) => {
               console.log(track.album)
               return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
           })
       }
       
        </div>
    )}else {
        return null;
    }

    }
}
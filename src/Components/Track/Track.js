import React from 'react';
import './Track.css'
import Notification from '../../utils/Notification';
class Track extends React.Component {
  
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}> - </button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}> + </button>
    }
  }



  addTrack() {
    this.props.onAdd(this.props.track);
    Notification("New Song Added", `Song: ${this.props.track.name} added to Playlist`, "success");
  }

  removeTrack() {
    if(this.props.onRemove){
    this.props.onRemove(this.props.track);
    Notification("Song Succesfully Removed", `Song: ${this.props.track.name} removed from Playlist`, "warning");

  }
  else {
    
  }

  }
  
  render() {
        return (
        <div className="Track">
            
            <div className="Track-information">
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artist} | {this.props.track.album} </p>
            </div>
            {this.renderAction()}
        
        </div>)
    }
}

export default Track;

import React from 'react';
import './TrackList.css'

import Track from '../Track/Track.js'

export default class TrackList extends React.Component {
    render() {
       return (<div className="TrackList">
        <Track />
        <Track />
        <Track />
    </div>)
    }
}
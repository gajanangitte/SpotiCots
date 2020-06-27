import React from 'react';
import './SearchBar.css';
import './SearchBar.scss';

export class SearchBar extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        term: '',
        type: 'track'
      }

      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    componentDidMount() {
      setTimeout( () => {
          this.search();
      }, 1000 );
      
    }

    search() {
      this.props.onSearch(this.state.term, this.state.type);
    }

    handleTermChange(event) {
      this.setState({term: event.target.value})
    }

    handleTypeChange(event) {
      console.log(event.target.id);
      this.setState({type: event.target.id});  
    }

    render() {
        return (
        <div className="SearchBar">
          <strong> Search Term: </strong><br/>
        <input placeholder="Enter A Song, Artist, or Album" onChange={this.handleTermChange}/>
           <strong> Search Type: </strong>
        <form>    
          <div className="radio-group">
            <input type="radio" id="track" name="selector" onChange={this.handleTypeChange} /><label htmlFor="track">Song</label>
            <input type="radio" id="artist" name="selector" onChange={this.handleTypeChange} /><label htmlFor="artist">Artist</label>
            <input type="radio" id="album" name="selector" onChange={this.handleTypeChange} /><label htmlFor="album">Album</label>
          </div>
        </form>

        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>)
    }

}
import React, {Component} from 'react';
import './App.css';
import{
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//Import API 
import apiKey from './Config';

//Import Components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from './components/SearchForm';
import NoPhotos from './components/NotFound';

const API = apiKey;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'flowers') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.setState({photos: response.data.photos.photo, loading: false});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }


  render() {
    return (
      <div className="container">
        <SearchForm />
        <Nav />
        <PhotoContainer data={this.state.photos}/>
    </div>
    )
  }
}




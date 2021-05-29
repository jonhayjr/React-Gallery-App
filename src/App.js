import React, {Component} from 'react';
import './App.css';
import{
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';

//Import API 
import apiKey from './Config';

//Import Components
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import SearchForm from './components/SearchForm';
import FourOhFour from './components/FourOhFour';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
      topic: ''
    }
  }

  getAPIData = (search = 'flowers') => {
    //Set loading state to true if it's false
    if (!this.state.loading) {
      this.setState({loading: true});
    }

    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
    this.setState({photos: response.data.photos.photo, loading: false, topic: search});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
     
    
}
  
  render() {
    return (
      <BrowserRouter basename='/react-gallery-app'>
      <div className='container'>
        <SearchForm onSearch={this.getAPIData}/>
        <Nav/>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/search/flowers' />}/>
            <Route path='/search/:topic' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.photos} onSearch={this.getAPIData}/>}/>
            <Route component={FourOhFour}/>
          </Switch>
      </div>
  </BrowserRouter>
    )
  }
}




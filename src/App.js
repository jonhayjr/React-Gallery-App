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
import NoPhotos from './components/NotFound';
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

  //Populate default data on page load
  componentDidMount() {
    this.getAPIData('flowers');
  }
  

  getAPIData = (search = 'flowers') => {
    //Only gets API data is topic has changed
    if (this.state.topic !== search) {
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
  }

  //Used to set loading state back to true
  updateLoading = () => {
    this.setState({loading: true});
  }

  render() {
    return (
      <BrowserRouter>
      <div className='container'>
        <SearchForm onSearch={this.getAPIData}/>
        <Nav/>
        {this.state.loading
        ? <p>Loading....</p>
        : (
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/search/flowers' />}/>
            <Route path='/search/:topic' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.photos} onSearch={this.getAPIData} updateLoading={this.updateLoading}/>}/>
            <Route component={FourOhFour}/>
          </Switch>
        )
        }    
      </div>
  </BrowserRouter>
    )
  }
}




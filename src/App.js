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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchPhotos: [],
      flowerPhotos: [],
      sunsetPhotos: [],
      beachPhotos: [],
      loading: true,
      topic: ''
    }
  }

  componentDidMount() {
    this.getFlowerData();
    this.getSunsetData();
    this.getBeachData();
  }

  getAPIData = (search) => {
    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.setState({searchPhotos: response.data.photos.photo, loading: false, topic: search});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }

  getFlowerData = () => {
    const search = 'flowers';
    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.setState({flowerPhotos: response.data.photos.photo, loading: false, topic: search});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }

  getSunsetData = () => {
    const search = 'sunsets';
    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.setState({sunsetPhotos: response.data.photos.photo, loading: false, topic: search});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }


  getBeachData = () => {
    const search = 'beaches';
    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      this.setState({beachPhotos: response.data.photos.photo, loading: false, topic: search});
    })
    .catch(err => {
      console.log('Error fetching and parsing data', err);
    });
  }



  render() {
    return (
      <BrowserRouter>
      <div className='container'>
      <SearchForm onSearch={this.getAPIData}/>
      <Nav />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/search/flowers' />}/>
          <Route path='/search/flowers' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.flowerPhotos} onSearch={this.getAPIData}/>}/>
          <Route path='/search/sunsets' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.sunsetPhotos} onSearch={this.getAPIData}/>}/>
          <Route path='/search/beaches' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.beachPhotos} onSearch={this.getAPIData}/>}/>
          <Route path='/search/:topic' render={(props) => <PhotoContainer loading={this.state.loading} title={this.state.topic} data={this.state.searchPhotos} onSearch={this.getAPIData}/>}/>
          <Route component={NoPhotos}/>
        </Switch>
    
      
      </div>
  </BrowserRouter>
    )
  }
}




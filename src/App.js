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
      loading: true
    }
  }

  componentDidMount() {
    this.getAPIData('flowers');
    this.getAPIData('sunsets');
    this.getAPIData('beaches');
  }

  getAPIData = (search) => {
    const API = apiKey;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      // handle success
      if (search === 'flowers') {
        this.setState({flowerPhotos: response.data.photos.photo, loading: false});
      } else if (search === 'sunsets') {
        this.setState({sunsetPhotos: response.data.photos.photo, loading: false});
      } else if (search === 'beaches') {
        this.setState({beachPhotos: response.data.photos.photo, loading: false});
      }  else {
        this.setState({searchPhotos: response.data.photos.photo, loading: false});
      }

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
          <Route path='/search/flowers' render={() => <PhotoContainer loading={this.state.loading} data={this.state.flowerPhotos} />}/>
          <Route path='/search/sunsets' render={() => <PhotoContainer loading={this.state.loading} data={this.state.sunsetPhotos} />}/>
          <Route path='/search/beaches' render={() => <PhotoContainer loading={this.state.loading} data={this.state.beachPhotos} />}/>
          <Route path='/search/:topic' render={() => <PhotoContainer loading={this.state.loading} data={this.state.searchPhotos} onSearch={this.getAPIData}/>}/>
          <Route component={NoPhotos}/>
        </Switch>
      </div>
  </BrowserRouter>
    )
  }
}




import React, {Component} from 'react';
import Photo from './Photo';
import NoPhotos from './NotFound';
import {withRouter} from 'react-router-dom';

class PhotoContainer extends Component {
  constructor(props) {
    super(props); 
  }

  componentDidMount() {
    ///Get current topic from path.  Use flowers as default value.
    const topic = this.props.history.location.pathname.replace('/search/', '') || 'flowers';
   
    //Get API Data
    this.props.onSearch(topic);
    
    //Set loading state to true
    this.props.updateLoading();
  }
  
  //To resolve issue with data updating after page refresh
  componentDidUpdate(prevProps) {
    ///Get current topic from path.  Use flowers as default value.
    const topic = this.props.history.location.pathname.replace('/search/', '') || 'flowers';

    //If topic changed, get API data
    if (prevProps.title !== topic) {
      this.props.onSearch(topic);
  }

  //If topic has changed and loading is false, loading is set to true
  if (this.props.title !== topic && !this.props.loading) {
    this.props.updateLoading();
  }
  }

  render() {
    const results = this.props.data;
    let photos;

      photos = results.map(photo =>
          <Photo url={`https://farm5.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} title={photo.title}/>
              );
      
   
    return(
      <div className="photo-container">
      <h2>{this.props.title}</h2>
        <ul>
          {
            this.props.loading
            ? <p>Loading...</p>
            : results.length
            ? photos
            : <NoPhotos />
          }
        </ul>
      </div> 
    );
  }
}



export default withRouter(PhotoContainer);
import React, {Component, useEffect} from 'react';
import Photo from './Photo';
import NoPhotos from './NotFound';
import {withRouter} from 'react-router-dom';

class PhotoContainer extends Component {
  constructor(props) {
    super(props); 
  }

//To resolve issue with data updating after page refresh
  componentDidUpdate() {
    let topic = this.props.match.params.topic;
    if (this.props.title !== topic) {
      this.props.onSearch(topic);
  }
  }

  
  render() {
    const results = this.props.data;
    let photos;


      if (results.length > 0 && !this.props.loading) {
          photos = results.map(photo =>
            <Photo url={`https://farm5.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} title={photo.title}/>
              );
        } else if (this.props.loading) {
          photos = <p>Loading...</p>
        } else {
            photos = <NoPhotos />;
        }
        
 
   
    return(
      <div className="photo-container">
      <h2>{this.props.title}</h2>
        <ul>
          {
          photos
          }
        </ul>
      </div> 
    );
  }
}



export default withRouter(PhotoContainer);
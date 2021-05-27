import React, {Component} from 'react';
import Photo from './Photo';
import NoPhotos from './NotFound';
import {withRouter} from 'react-router-dom';

class PhotoContainer extends Component {
  constructor(props) {
    super(props); 
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
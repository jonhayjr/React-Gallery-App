import React, {Component} from 'react';
import Photo from './Photo';
import NoPhotos from './NotFound';
export default class PhotoContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const results = this.props.data;
   
    let photos;
    if (!this.props.loading) {
      if (results.length > 0) {
          photos = results.map(photo =>
            <Photo url={`https://farm5.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} title={photo.title}/>
          );
      } else {
        photos = <NoPhotos />;
      }
    } else {
      photos = <p>Loading...</p>
    }
  
    return(
      <div className="photo-container">
        <ul>
          {photos}
        </ul>
      </div> 
    );
  }
}

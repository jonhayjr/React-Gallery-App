import React from 'react';
import Photo from './Photo';
import NoPhotos from './NotFound';

const PhotoContainer = props => { 
  const results = props.data;
  let photos;
  if (results.length > 0) {
    photos = results.map(photo =>
      <Photo url={`https://farm5.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} title={photo.title}/>
    );
  } else {
    photos = <NoPhotos />;
  }

  return(
    <div className="photo-container">
      <ul>
        {photos}
      </ul>
    </div> 
  );
}

export default PhotoContainer;

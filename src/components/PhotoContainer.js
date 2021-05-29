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
  }
  

  componentDidUpdate(prevProps, prevState) {
    ///Get current topic from path.  Use flowers as default value.
    const topic = this.props.history.location.pathname.replace('/search/', '') || 'flowers';

    //If topic changed and loading is set to false, fetch api data.
      if (prevProps.title !== topic && !this.props.loading) {
        this.props.onSearch(topic);
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
            {
              this.props.loading
              ? <h2>Loading...</h2>
              : results.length
              ? (<div>
                  <h2>{this.props.title}</h2>
                  <ul>{photos}</ul>
                </div>)
              : <ul><NoPhotos /></ul>
            }
      </div>
    );
  }

}



export default withRouter(PhotoContainer);
import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";
const Gallery = props => {
  const {data, onMouseOver} = props;
  let images;
  let noImages;

  // map variables to each item in fetched image array and return image component
  if (data.length > 0) {
    images = data.map(image => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      // Add active key to image state so it can be updated based on events
      let active = image.active;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      // Pass the active boolean property
      return <Image active={active} onMouseOver={onMouseOver} id={id} url={url} key={id} alt={title} />;
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>{images}</ul>
      {noImages}
    </div>
  );
};

export default Gallery;

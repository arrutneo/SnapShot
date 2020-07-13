import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {

  // Contextualize setImages method so the "images" state can be updated from here.
  const { images, setImages, loading, runSearch } = useContext(PhotoContext);

  // Checking if the search term is already in the state so display methods iterate over it
  const imagesArray = images.hasOwnProperty(searchTerm) ? images[searchTerm] : images.empty;

  // Update images state according to mouse over and update images state only if it has changed
  const onMouseOverHandler = (id) => {

    const indexId = images[searchTerm].findIndex(image => parseInt(image.id) === parseInt(id));

    const imagesCopy = cloneDeep(images);

    imagesCopy[searchTerm].forEach((item, index) => indexId === index ? item.active = true : item.active = false);

    !isEqual(images, imagesCopy) && setImages({...images, [searchTerm]: imagesCopy[searchTerm]});

  };

  useEffect(() => {
    runSearch(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className="photo-container">
      // Add Map component and onMouseOver handler to both components so their children can manage the event
      {loading ? <Loader /> : <><MapContainer onMouseOver={onMouseOverHandler} data={imagesArray} /><Gallery onMouseOver={onMouseOverHandler} data={imagesArray} /></>}
    </div>
  );
};

export default Container;

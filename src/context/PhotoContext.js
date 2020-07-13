import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  // Update the state's definition from an array to an object with keys based on search
  const [images, setImages] = useState({
    empty: []
  });
  const [loading, setLoading] = useState(true);
  const runSearch = query => {
    // Check if the query has been searched before to avoid extra API calls
    if (!images.hasOwnProperty(query)) {
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&has_geo=1&extras=geo&format=json&nojsoncallback=1`
        )
        .then(response => {
          setImages({...images,
            // Add query as a property of the state with API's answer as value
            [query]: response.data.photos.photo,
          },);
          setLoading(false);
        })
        .catch(error => {
          console.log(
            "Encountered an error with fetching and parsing data",
            error
          );
        });
    }
  };
  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;

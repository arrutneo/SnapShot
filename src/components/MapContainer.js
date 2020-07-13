// New Component for managing a google map
import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

const adjustMap = (props, map) => {
  const {google, children} = props;
  const bounds = new google.maps.LatLngBounds();

  children.forEach(marker => {
    const {lat, lng} = marker.props.position;
    bounds.extend(new google.maps.LatLng(lat, lng));
  });

  map.fitBounds(bounds);
  map.panToBounds(bounds);
};

const MapContainer = (props) => {
  const { google, onMouseOver } = props;
  const results = props.data;
  let markers;

  const onMouseOverHandler = (props, marker, event) => {
    const { map, id, position } = props;

    position.lat = parseInt(position.lat);
    position.lng = parseInt(position.lng);

    map.panTo(position);

    onMouseOver(id);
  }

  if (results.length > 0 ) {
    markers = results.map(image => {
      let id = image.id;
      let title = image.title;
      let latitude = image.latitude;
      let longitude = image.longitude;
      let active = image.active;

      return (
        <Marker
          id={id}
          key={id}
          title={title}
          position={{
            lat: latitude,
            lng: longitude,
          }}
          onMouseover={onMouseOverHandler}
          icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${active ? 'purple' : 'yellow'}-dot.png`,
              }}
        />
      );
    });
  }

  return (
    <div className="map-container">
      <Map
        google={google}
        // gestureHandling="none"
        containerStyle={containerStyle}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        onReady={adjustMap}
        disableDefaultUI
      >
      {markers}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: '',
})(MapContainer);

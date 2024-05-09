'use client'
import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { db } from "../config/firebase";
import { googleMapConfig } from "../config/googlemap";
import { collection, getDocs } from "firebase/firestore";

const MapLocation = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchInput, setSearchInput] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [infoWindowSize, setInfoWindowSize] = useState("lg"); 
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); 


  // Load script for Google map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapConfig.libraries, // Sử dụng mảng libraries từ file config
  });

  // Static lat and lng
  const center = { lat: 16.0544, lng: 108.2022 }; // Địa chỉ Đà Nẵng

  // Custom map styles
  const mapStyles = [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  // Fetch suggestions from Firestore
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const data = querySnapshot.docs.map((doc) => {
          const locationData = doc.data();
          return { ...locationData, id: doc.id };
        });
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  // Function to handle marker click
  const handleMarkerClick = (markerInfo) => {
    setSelectedMarkerInfo(markerInfo);
  };

  const handlePlaceSelect = (address) => {
  const selectedPlace = suggestions.find(location => location.address === address);
  setSelectedPlace(selectedPlace);
  setInfoWindowSize("xl"); // Set info window size to extra large

  // Set the position of the info window to the selected place
  setInfoWindowPosition({
    lat: parseFloat(selectedPlace.latitude),
    lng: parseFloat(selectedPlace.longitude)
  });

  // Move map to selected place and zoom in
  setCurrentLocation({
    lat: parseFloat(selectedPlace.latitude),
    lng: parseFloat(selectedPlace.longitude)
  });

  // Set the selected marker info for InfoWindow
  setSelectedMarkerInfo({
    locationType: selectedPlace.locationType,
    address: selectedPlace.address,
    createdAt: selectedPlace.createdAt,
    userId: selectedPlace.userId,
    image: selectedPlace.image
  });

  setSearchInput("");
};

  // Check for script loading error
  if (loadError) return <div>Error loading map</div>;

  // Wait until the script is loaded before rendering the map
  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="w-full h-[80vh] bg-white rounded-lg shadow-lg relative">
      {/* Ô tìm kiếm */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 mt-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter your location"
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <ul className="absolute left-0 w-full bg-white border rounded-md mt-1 shadow-lg">
          {searchInput && suggestions
            .filter((location) =>
              typeof location.address === 'string' && // Check if address is a string
              location.address.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((location, index) => (
              <li
                key={index}
                onClick={() => handlePlaceSelect(location.address)} // Call handlePlaceSelect khi click vào mỗi item
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {location.address}
              </li>
            ))}
        </ul>
      </div>

      {/* Map component */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={infoWindowPosition || currentLocation || (selectedPlace ? { lat: parseFloat(selectedPlace.latitude), lng: parseFloat(selectedPlace.longitude) } : center)}
        mapContainerClassName="map"
        mapContainerStyle={{ position: "relative", maxWidth: "100%", height: "100%" }}
        options={{
          styles: mapStyles // Passing your custom map styles here
        }}
      >
        {/* Render markers */}
        {suggestions.map((location, index) => {
          // Khai báo customMarkerIcons bên trong useEffect để đảm bảo rằng window.google.maps đã được xác định
          if (isLoaded) {
            const customMarkerIcon1 = {
              url: "https://cdn-icons-png.flaticon.com/512/8637/8637632.png", 
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0), 
              anchor: new window.google.maps.Point(20, 40) 
            };
        
            const customMarkerIcon2 = {
              url: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png", 
              scaledSize: new window.google.maps.Size(40, 40), 
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 40) 
            };

            return (
              <Marker
                key={index}
                position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
                icon={location.approve ? customMarkerIcon1 : customMarkerIcon2}
                onClick={() => handleMarkerClick({
                  locationType: location.locationType,
                  address: location.address,
                  createdAt: location.createdAt,
                  userId: location.userId,
                  image: location.image
                })}
              />
            );
          }
          return null;
        })}
        
        {/* InfoWindow for displaying marker info */}
        {selectedMarkerInfo && infoWindowPosition && (
          <InfoWindow
            position={infoWindowPosition}
            onCloseClick={() => setSelectedMarkerInfo(null)}
            options={{ maxWidth: "400" }} // Set max width of info window
          >
            <div className={`p-4 bg-white rounded-lg shadow-lg ${infoWindowSize}`}>
              <h2 className="text-xl font-bold mb-2">Location Type: {selectedMarkerInfo.locationType}</h2>
              <p className="mb-2">Address: {selectedMarkerInfo.address}</p>
              <p className="mb-2">Created At: {selectedMarkerInfo.createdAt.toDate().toString()}</p>
              <p className="mb-2">User ID: {selectedMarkerInfo.userId}</p>
              <img src={selectedMarkerInfo.image} alt="Location Image" className="w-full h-auto" />
            </div>
          </InfoWindow>
        )}

      </GoogleMap>

    </div>
  );
};

export default MapLocation;

'use client'
import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { db } from "../config/firebase";
import { googleMapConfig } from "../config/googlemap";
import { collection,doc, getDocs, updateDoc, query, orderBy, where } from "firebase/firestore";
import { FaUser, FaMapMarkerAlt, FaClock, FaImage,FaPoll, FaDumpster, FaRecycle  } from 'react-icons/fa';

const MapLocation = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchInput, setSearchInput] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [infoWindowSize, setInfoWindowSize] = useState("lg"); 
  const [infoWindowPosition, setInfoWindowPosition] = useState(null); 
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Load script for Google map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapConfig.libraries,
  });

  // Define center
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  // Function to handle marker click
  const handleMarkerClick = (location) => {
    console.log(location)
    setSelectedMarkerInfo({
      locationType: location.locationType,
      address: location.address,
      createdAt: location.createdAt,
      userId: location.userId,
      image: location.image,
      approve: location.approve,
      description: location.description,
      id: location.id
    });
    setInfoWindowSize('lg');
    setInfoWindowPosition({
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    });
    setCurrentLocation({
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    });
    setInfoWindowOpen(true)
  };

  const handleApproveButtonClick = async (location) => {
    try {
      if (location.id) {
        const activitiesDocRef = doc(db, "locations", location.id);
        await updateDoc(activitiesDocRef, {
          approve: true
        });
  
        // Cập nhật trạng thái "approve" trong mảng suggestions
        const updatedSuggestions = suggestions.map((suggest) => {
          if (suggest.id === location.id) {
            return { ...suggest, approve: true };
          }
          return suggest;
        });
        setSuggestions(updatedSuggestions);
  
        console.log('Approved location:', location.address);
  
        // Đóng InfoWindow
        setSelectedMarkerInfo(null);
        setInfoWindowPosition(null);
      } else {
        console.error('Cannot approve location: Selected marker info is undefined');
      }
    } catch (error) {
      console.error('Error approving location:', error);
    }
  };
  

  const handlePlaceSelect = (address) => {
    const selectedPlace = suggestions.find(location => location.address === address);
    setSelectedPlace(selectedPlace);
    setInfoWindowSize("xl");
    setInfoWindowPosition({
      lat: parseFloat(selectedPlace.latitude),
      lng: parseFloat(selectedPlace.longitude)
    });
    setCurrentLocation({
      lat: parseFloat(selectedPlace.latitude),
      lng: parseFloat(selectedPlace.longitude)
    });
    setSelectedMarkerInfo({
      locationType: selectedPlace.locationType,
      address: selectedPlace.address,
      createdAt: selectedPlace.createdAt,
      userId: selectedPlace.userId,
      image: selectedPlace.image,
      approve: selectedPlace.approve,
      description: selectedPlace.description,
      id : selectedPlace.id
    });
    setSearchInput("");
    setInfoWindowOpen(true)
  };

  useEffect(() => {
    if (!infoWindowOpen) {
      setCurrentLocation(null);
    }
  }, [infoWindowOpen]);

  if (loadError) return <div>Error loading map</div>;

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="w-full h-[80vh] bg-white rounded-lg shadow-lg relative">
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
              typeof location.address === 'string' &&
              location.address.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((location, index) => (
              <li
                key={index}
                onClick={() => handlePlaceSelect(location.address)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {location.address}
              </li>
            ))}
        </ul>
      </div>
      
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={infoWindowPosition || currentLocation || (selectedPlace ? { lat: parseFloat(selectedPlace.latitude), lng: parseFloat(selectedPlace.longitude) } : center)}
        mapContainerClassName="map"
        mapContainerStyle={{ position: "relative", maxWidth: "100%", height: "100%" }}
        options={{
          styles: mapStyles
        }}
      >
        {suggestions.map((location, index) => {
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
                key={location.id}
                position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
                icon={location.approve ? customMarkerIcon1 : customMarkerIcon2}
                onClick={() => handleMarkerClick(location)}
              />
            );
          }
          return null;
        })}
        
        {selectedMarkerInfo && infoWindowPosition &&  (
          <InfoWindow
            position={infoWindowPosition}
            onCloseClick={() => {
              setSelectedMarkerInfo(null);
              setInfoWindowPosition(null);
              setInfoWindowOpen(false); // Close InfoWindow
            }}
            options={{ maxWidth: "500" ,maxHeight: "400"}}
          >
            <div className={`p-4 bg-white rounded-lg shadow-lg ${infoWindowSize}`}>
              <div className="flex items-center p-2">
                {selectedMarkerInfo.locationType === "Polluted Area" && (
                  <FaPoll className="mr-2 text-cyan-500" size={30} />
                )}
                {selectedMarkerInfo.locationType === "Garbage Dump" && (
                  <FaDumpster className="mr-2 text-cyan-500" size={30} />
                )}
                {selectedMarkerInfo.locationType === "Recycling Center" && (
                  <FaRecycle className="mr-2 text-cyan-500" size={30} />
                )}
                <strong className="text-lg">
                  {selectedMarkerInfo.locationType}
                </strong>
              </div>

              <div className="flex items-center p-2">
                <FaMapMarkerAlt className="mr-2 text-cyan-500" size={20} />
                <p className="mb-2">
                  {selectedMarkerInfo.address}
                </p>
              </div>
              
              <div className="flex items-center p-2">
                <FaClock className="mr-2 text-cyan-500" size={15} />
                <p className="mb-2">
                  {selectedMarkerInfo.createdAt.toDate().toString()}
                </p>
              </div>

              <div className="flex items-center p-2">
                <FaUser className="mr-2 text-cyan-500" size={15} />
                <p className="mb-2">
                  {users.find(user => user.id === selectedMarkerInfo.userId)?.name}
                </p>
              </div>

              <div className="flex items-center p-2">
                <FaImage className="mr-2 text-cyan-500" size={15} />
                <p>Description:</p>
              </div>
                <p className="mb-2 text-gray-500">  
                  {selectedMarkerInfo.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {selectedMarkerInfo.image.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-1/2 md:w-1/3 p-1 cursor-pointer"
                        onClick={() => handleClickImage(imageUrl)}
                      />
                    ))}
                </div>
                {selectedImage && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}></div>
                    <div className="absolute p-4">
                      <img src={selectedImage} alt="Selected Image" className="max-w-full max-h-full" />
                    </div>
                  </div>
                )}
                {selectedMarkerInfo.approve === false && (
                  <button onClick={() => handleApproveButtonClick(selectedMarkerInfo)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Approve
                  </button>
                )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapLocation;

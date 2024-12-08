import { useRef, useEffect, useState } from "react";
import { Geocoder } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Select, SelectItem } from "@nextui-org/react";
import { SatelliteIcon } from "../../assets/SatelliteIcon";
import { OutdoorsIcon } from "../../assets/OutdoorsIcon";
import { StreetIcon } from "../../assets/StreetIcon";

const accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;
const mapStyles = [
  { name: "Streets", style: "mapbox://styles/mapbox/streets-v12", icon: <StreetIcon className="w-5 h-5" /> },
  { name: "Outdoors", style: "mapbox://styles/mapbox/outdoors-v12", icon: <OutdoorsIcon className="w-5 h-5" /> },
  { name: "Satellite", style: "mapbox://styles/mapbox/satellite-v9", icon: <SatelliteIcon className="w-5 h-5" /> },
];

export default function Map({ setAddress, setLocation }) {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const markerRef = useRef();
  const [, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coords, setCoords] = useState({lng: 79.10, lat: 21.15});

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [79.10, 21.15],
      zoom: 3,
    });

    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    })

    const removeElements = () => {
      const elementToRemove = document.querySelector(".mapboxgl-ctrl.mapboxgl-ctrl-attrib");
      const elements = document.querySelector(".mapboxgl-ctrl-logo");

      if (elementToRemove) {
        elementToRemove.remove();
      }

      if (elements) {
        const parentElement = elements.parentElement;
        parentElement.remove();
      }
    };
  
    removeElements();

    mapInstanceRef.current.addControl(new mapboxgl.NavigationControl());
    mapInstanceRef.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    mapInstanceRef.current.addControl(geolocateControl, 'bottom-right');
    geolocateControl.on('geolocate', (e) => {
      const { coords } = e;
      mapInstanceRef.current.flyTo({
        center: [coords.longitude, coords.latitude],
        essential: true
      });
    });

    markerRef.current = new mapboxgl.Marker();
    mapInstanceRef.current.on('click', handleMapClick);
    return () => {
      mapInstanceRef.current.off('click', handleMapClick);
    };
  }, []);

  const handleMapClick = async (e) => {
    const { lng, lat } = e.lngLat;
    setCoords({lng: lng, lat: lat});
    setLocation({lng: lng.toFixed(2), lat: lat.toFixed(2)});
    markerRef.current.setLngLat([lng, lat]).addTo(mapInstanceRef.current);
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setSelectedAddress(data.features[0].place_name);
        setAddress(data.features[0].place_name);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const changeMapStyle = (styleUrl) => {
    mapInstanceRef.current.setStyle(styleUrl);
  };

  return (
    <>
      <Geocoder
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        marker={false}
      />
      <div id="map-container" ref={mapContainerRef} className="rounded-lg" style={{ height: 300 }}>
        <div className="absolute bottom-1 left-1 z-[100]">
          <Select
            className="w-32"
            size="sm"
            color="secondary" 
            selectionMode="single"
            defaultSelectedKeys="mapbox://styles/mapbox/outdoors-v12"
            onChange={(e) => changeMapStyle(e.target.value)}
          >
            {mapStyles.map((style) => (
              <SelectItem key={style.style} value={style.style} startContent={style.icon} color="secondary">
                {style.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
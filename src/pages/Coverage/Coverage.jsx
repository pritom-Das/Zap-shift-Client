import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  //   const positions = [{ name: "Dhaka", lat: 23.8103, lng: 90.4125 }];
  const position = [23.685, 90.3563];
  const warehouseLocations = useLoaderData();
  const mapref = useRef(null);
  //   console.log(warehouseLocations);
  const handleSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase().trim();

    // 2. Find the district object
    // We check if the district name (lowercase) matches the input (lowercase)
    const matchedDistrict = warehouseLocations.find((item) =>
      item.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (matchedDistrict) {
      const coord = [matchedDistrict.latitude, matchedDistrict.longitude];
      console.log(coord);
      mapref.current.flyTo(coord, 13);
    }
  };
  return (
    <div>
      <div>
        <h2>We are available in 64 districts</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              name="location"
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/* there will be the map */}
      <div className="border h-120">
        <MapContainer
          center={position}
          zoom={7.5}
          scrollWheelZoom={false}
          className="h-120"
          ref={mapref}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warehouseLocations.map((warehous, index) => (
            <Marker
              key={index}
              position={[warehous.latitude, warehous.longitude]}
            >
              <Popup>
                <strong>{warehous.district}</strong> <br /> Coverd Ares:{" "}
                {warehous.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

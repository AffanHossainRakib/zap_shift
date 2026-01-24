import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef, useEffect } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Coverage = () => {
  // Fix for missing marker icons in production
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);
  const warehouses = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim().toLowerCase();
    const district = warehouses.find((wh) =>
      wh.district.toLowerCase().includes(location),
    );
    if (district) {
      const coordinates = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinates, 12);
    }
  };

  return (
    <section className="container mx-auto my-10 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        We are available in 64 districts
      </h2>

      {/* Search  */}
      <div className="pt-6">
        <form onSubmit={handleSearch} className="flex">
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
              name="location"
              type="search"
              className="grow"
              placeholder="Search"
            />
          </label>
          <button type="submit" className="btn btn-primary ml-2">
            Search
          </button>
        </form>
      </div>

      <div className="mt-10 w-full h-100 sm:h-150">
        <MapContainer
          center={
            warehouses.length
              ? [warehouses[0].latitude, warehouses[0].longitude]
              : [0, 0]
          }
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg shadow-lg"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {warehouses.map((warehouse, index) => (
            <Marker
              key={index}
              position={[warehouse.latitude, warehouse.longitude]}
            >
              <Popup>
                <strong>Region:</strong> {warehouse.region} <br />
                <strong>District:</strong> {warehouse.district} <br />
                <strong>Covered Areas:</strong>{" "}
                {warehouse.covered_area.join(", ")} <br />
                <strong>Status:</strong> {warehouse.status} <br />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;

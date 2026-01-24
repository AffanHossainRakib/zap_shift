import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const warehouses = useLoaderData();

  return (
    <section className="container mx-auto my-10 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        We are available in 64 districts
      </h2>

          <div></div>
          
      <div className="mt-10 w-full h-100 sm:h-150">
        <MapContainer
          center={warehouses.length ? [warehouses[0].latitude, warehouses[0].longitude] : [0, 0]}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full rounded-lg shadow-lg"
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

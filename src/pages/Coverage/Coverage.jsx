import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [23.8041, 90.4152];

  return (
    <section className="container mx-auto my-10 sm:my-20">
      <h2 className="text-3xl sm:text-5xl text-secondary font-bold">
        We are available in 64 districts
      </h2>

      <div></div>
      <div className="mt-10 w-full h-100 sm:h-150">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full rounded-lg shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;

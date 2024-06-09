import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { markerImg, markerShadow } from "@/assets";

const legalIcon = new Icon({
  iconUrl: markerImg,
  shadowUrl: markerShadow,
  shadowSize: [40, 40],
  iconSize: [40, 40],
  iconAnchor: [18, 38],
  shadowAnchor: [12, 40],
  popupAnchor: [0, -40],
});

const position: [number, number] = [31.214457, 29.994616];

export default function AboutMap({ location }: { location: [number, number] }) {
  return (
    <MapContainer
      className="z-0 h-full w-full rounded-[0.25rem]"
      center={location ?? position}
      zoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location ?? position} icon={legalIcon} />
    </MapContainer>
  );
}

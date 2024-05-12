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

export default function AboutMap() {
  return (
    <MapContainer
      className="-z-10 h-full w-full rounded-[0.5rem]"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={legalIcon} />
    </MapContainer>
  );
}
